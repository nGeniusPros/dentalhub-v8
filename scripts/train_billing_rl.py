from deepseek_api import PPOBillingTrainer

if __name__ == '__main__':
    trainer = PPOBillingTrainer({
        'base_model': 'Qwen/Qwen2.5-3B'
    })
    trainer.train(
        num_epochs=50,
        batch_size=64
    )
