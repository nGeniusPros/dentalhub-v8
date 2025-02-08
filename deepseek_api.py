from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
import os
import pandas as pd

app = FastAPI(title="DeepSeek API")

# Global variables for model and tokenizer
model = None
tokenizer = None

@app.on_event("startup")
async def startup_event():
    """Initialize model and tokenizer on startup"""
    global model, tokenizer
    try:
        # Check for CUDA availability
        device = "cuda" if torch.cuda.is_available() else "cpu"
        print(f"Using device: {device}")
        
        if device == "cuda":
            # Log CUDA information
            print(f"CUDA Device: {torch.cuda.get_device_name(0)}")
            print(f"CUDA Memory: {torch.cuda.get_device_properties(0).total_memory / 1e9:.2f} GB")
    except Exception as e:
        print(f"Warning: Error checking CUDA availability: {str(e)}")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        # Check CUDA availability
        cuda_available = torch.cuda.is_available()
        cuda_info = {
            "device_name": torch.cuda.get_device_name(0) if cuda_available else None,
            "device_count": torch.cuda.device_count() if cuda_available else 0
        } if cuda_available else None

        return JSONResponse({
            "status": "healthy",
            "service": "deepseek-llm",
            "cuda_available": cuda_available,
            "cuda_info": cuda_info
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Health check failed: {str(e)}")

@app.get("/gpu-info")
async def gpu_info():
    """Get detailed GPU information"""
    try:
        if not torch.cuda.is_available():
            return JSONResponse({
                "status": "no_gpu",
                "message": "No GPU available"
            })

        info = {
            "cuda_available": True,
            "device_count": torch.cuda.device_count(),
            "current_device": torch.cuda.current_device(),
            "devices": []
        }

        for i in range(torch.cuda.device_count()):
            props = torch.cuda.get_device_properties(i)
            info["devices"].append({
                "name": props.name,
                "total_memory": f"{props.total_memory / 1e9:.2f} GB",
                "major": props.major,
                "minor": props.minor,
                "multi_processor_count": props.multi_processor_count
            })

        return JSONResponse(info)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting GPU info: {str(e)}")

class PatientCommEnv:
    def __init__(self):
        self.patient_profile = None
        self.communication_history = []

    def reset(self, patient_data):
        self.patient_profile = {
            'demographics': patient_data,
            'response_history': []
        }
        return self._get_state()

    def step(self, action):
        # Action format: {'channel': 'sms|email|voice', 'time': 'HH:MM', 'message_type': 'reminder|followup'}
        response_rate = self._send_communication(action)
        
        reward = self._calculate_reward(action, response_rate)
        done = response_rate > 0.8  # Threshold for successful engagement
        
        self.communication_history.append(action)
        return self._get_state(), reward, done, {'response_rate': response_rate}

    def _calculate_reward(self, action, response_rate):
        # Multi-objective reward calculation
        channel_weights = {'sms': 0.4, 'email': 0.3, 'voice': 0.3}
        cost_factors = {'sms': 0.1, 'email': 0.05, 'voice': 0.2}
        
        base_reward = response_rate * channel_weights[action['channel']]
        cost_penalty = 1 - cost_factors[action['channel']]
        return base_reward * cost_penalty

    def _get_state(self):
        return {
            'patient': self.patient_profile,
            'comms_history': self.communication_history
        }

    def _send_communication(self, action):
        # Simulate sending communication and getting response rate
        # Replace with actual implementation
        return 0.5

class SchedulingEnv:
    def __init__(self):
        self.schedule = pd.DataFrame(columns=['start', 'end', 'provider', 'patient_type'])
        self.patient_history = {}

    def reset(self):
        self.schedule = initialize_schedule()  # Assume exists
        self.patient_history = load_patient_data()  # Assume exists
        return self._get_state()

    def step(self, action):
        """Action: {
            'time_slot': '2025-02-08T09:00',
            'patient_type': 'new|emergency|followup',
            'provider': 'dr_smith|hygienist'
        }"""
        try:
            # Book appointment
            new_row = {
                'start': action['time_slot'],
                'end': calculate_end_time(action),
                'provider': action['provider'],
                'patient_type': action['patient_type']
            }
            self.schedule = pd.concat([self.schedule, pd.DataFrame([new_row])])
            
            reward = self._calculate_reward(action)
            done = self._check_schedule_full()
            return self._get_state(), reward, done, {}
        except Exception as e:
            return self._get_state(), -1.0, True, {'error': str(e)}

    def _calculate_reward(self, action):
        gap_score = 0.3 * (1 - self._calculate_time_gaps())
        match_score = 0.4 * self._provider_specialty_match(action)
        no_show_score = 0.3 * (1 - self._predict_no_show(action))
        return gap_score + match_score + no_show_score

    def _get_state(self):
        return {
            'schedule': self.schedule.to_dict(),
            'patient_history': self.patient_history
        }

class InventoryEnv:
    def __init__(self):
        self.stock_levels = {}
        self.order_history = []
        self.demand_predictor = self._init_demand_model()

    def reset(self):
        self.stock_levels = load_initial_inventory()
        return self._get_state()

    def step(self, action):
        """
        Action: {
            'item': 'dental_implants',
            'quantity': 50,
            'supplier': 'main_vendor'
        }
        """
        # Validate and sanitize input
        if not isinstance(action, dict):
            raise ValueError("Invalid action type")
        if action['item'] not in VALID_ITEMS:
            raise HTTPException(status_code=400, detail="Invalid inventory item")

        try:
            self._process_order(action)
            reward = self._calculate_reward(action)
            done = self._check_inventory_stable()
            return self._get_state(), reward, done, {}
        except Exception as e:
            return self._get_state(), -1.0, True, {'error': str(e)}

    def _calculate_reward(self, action):
        stockout_risk = 0.6 * (1 - self._stockout_likelihood(action['item']))
        waste_score = 0.3 * (1 - self._waste_potential(action['item']))
        emergency_cost = 0.1 * (1 - self._emergency_order_needed())
        return stockout_risk + waste_score + emergency_cost

    def _get_state(self):
        return {
            'stock_levels': self.stock_levels,
            'pending_orders': self.order_history
        }

@app.post('/optimize-communication')
async def optimize_communication(patient_data: dict):
    env = PatientCommEnv()
    state = env.reset(patient_data)
    
    # Get initial recommendation
    action_policy = {
        'channel': 'email' if patient_data['age'] > 50 else 'sms',
        'time': '10:00',
        'message_type': 'reminder'
    }
    
    state, reward, done, info = env.step(action_policy)
    
    return {
        'recommended_channel': action_policy['channel'],
        'optimal_time': action_policy['time'],
        'confidence': reward,
        'fallback_channel': 'voice' if reward < 0.5 else None
    }

@app.post('/optimize-schedule')
async def optimize_schedule(patient_data: dict):
    env = SchedulingEnv()
    env.reset()
    
    # Generate initial action
    action = {
        'time_slot': find_next_available_slot(),
        'patient_type': patient_data['type'],
        'provider': 'dr_smith' if patient_data['type'] == 'emergency' else 'hygienist'
    }
    
    state, reward, done, _ = env.step(action)
    
    return {
        'recommended_time': action['time_slot'],
        'provider': action['provider'],
        'confidence': min(max(reward, 0.0), 1.0),
        'alternative_times': get_alternative_slots(state)
    }

@app.post('/optimize-inventory')
async def optimize_inventory(order_data: dict):
    env = InventoryEnv()
    env.reset()
    
    action = {
        'item': order_data['item'],
        'quantity': calculate_optimal_order(
            current=order_data['current_stock'],
            lead_time=order_data['lead_time']
        ),
        'supplier': 'default'
    }
    
    state, reward, done, _ = env.step(action)
    
    return {
        'recommended_order': action['quantity'],
        'item': action['item'],
        'confidence': f"{min(max(reward*100, 0), 100):.1f}%",
        'emergency_flag': env._needs_emergency_order(state)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)