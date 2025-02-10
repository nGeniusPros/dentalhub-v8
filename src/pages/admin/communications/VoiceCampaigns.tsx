import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gear, Plus, Phone, Activity } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { VoiceCampaignList } from "./components/voice/VoiceCampaignList";
import { CreateCampaignDialog } from "./components/voice/CreateCampaignDialog";
import { AIAgentSettings } from "./components/voice/AIAgentSettings";
import { VoiceAnalytics } from "./components/voice/VoiceAnalytics";
import { TermsDialog } from "./components/voice/TermsDialog";
import { useSettings } from "../../../contexts/SettingsContext";
import { VoiceCampaignStats } from "./components/voice/VoiceCampaignStats";

const VoiceCampaigns = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [showAgentSettings, setShowAgentSettings] = useState(false);
  const { state } = useSettings();

  // Check if terms have been accepted
  React.useEffect(() => {
    const termsAccepted = localStorage.getItem("voiceTermsAccepted");
    if (!termsAccepted) {
      setShowTermsDialog(true);
    }
  }, []);

  return (
    <div className="p-6 space-y-6 bg-gray-lighter min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Phone className="w-8 h-8 text-gold" />
            <h1 className="text-2xl font-bold text-navy">
              Voice Campaigns
              <span className="ml-2 text-sm font-normal text-gray-darker">
                <Activity className="inline mr-1 w-4 h-4" />
                3 Active Campaigns
              </span>
            </h1>
          </div>
          <Button variant="primary" onClick={() => setShowCreateDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="space-y-6">
          <VoiceCampaignStats />

          {/* Analytics Dashboard */}
          <VoiceAnalytics />
        </div>

        {/* Campaign List */}
        <AnimatePresence>
          <VoiceCampaignList />
        </AnimatePresence>

        {/* Create Campaign Dialog */}
        <CreateCampaignDialog
          open={showCreateDialog}
          onClose={() => setShowCreateDialog(false)}
        />

        {/* AI Agent Settings Dialog */}
        <AIAgentSettings
          open={showAgentSettings}
          onClose={() => setShowAgentSettings(false)}
        />

        {/* Terms and Conditions Dialog */}
        <TermsDialog
          open={showTermsDialog}
          onClose={() => {
            setShowTermsDialog(false);
            localStorage.setItem("voiceTermsAccepted", "true");
          }}
        />
      </div>
    </div>
  );
};

export default VoiceCampaigns;
