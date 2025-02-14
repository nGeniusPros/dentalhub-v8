import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SalesLanding from "../pages/SalesLanding";
import Login from "../pages/Login";
import Dashboard from "../pages/AdminDashboard.tsx";
import DashboardLayout from "../components/layout/DashboardLayout";
import InsuranceARDashboard from "../pages/admin/insurance/InsuranceARDashboard";
import HRDashboard from "../pages/admin/hr/HRDashboard";
import AdminLogin from "../pages/login/AdminLogin";
import MembershipPlans from "../pages/admin/MembershipPlans";
import AIPracticeConsultant from "../pages/admin/AIPracticeConsultant";
import Patients from "../pages/admin/Patients";
import SMSCampaigns from "../pages/admin/communications/SMSCampaigns";
import PasswordManager from "../pages/admin/settings/PasswordManager";
import VendorManagement from "../pages/admin/settings/VendorManagement";
import GeneralSettings from "../pages/admin/settings/GeneralSettings";
import Marketplace from "../pages/admin/marketplace/Marketplace";
import StaffManagement from "../pages/admin/hr/StaffManagement";
import EmailDashboard from "../pages/admin/communications/EmailDashboard";
import VoiceCampaigns from "../pages/admin/communications/VoiceCampaigns";
import SocialMediaDashboard from "../pages/admin/social/SocialMediaDashboard";
import LearningDashboard from "../pages/admin/learning/LearningDashboard";
import ResourcesDashboard from "../pages/admin/resources/ResourcesDashboard";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<SalesLanding />} />

      {/* Login routes */}
      <Route path="/login">
        <Route index element={<Login />} />
        <Route path="admin" element={<AdminLogin />} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin-dashboard" element={<DashboardLayout role="admin" />}>
        <Route index element={<Dashboard />} />
        <Route path="ai-consultant" element={<AIPracticeConsultant />} />
        <Route path="hr" element={<HRDashboard />} />
        <Route path="insurance" element={<InsuranceARDashboard />} />
        <Route path="patients" element={<Patients />} />
        <Route path="staff-management" element={<StaffManagement />} />
        <Route path="membership-plans" element={<MembershipPlans />} />
        <Route path="sms-campaigns" element={<SMSCampaigns />} />
        <Route path="resources" element={<ResourcesDashboard />} />
        <Route path="email-campaigns" element={<EmailDashboard />} />
        <Route path="voice-campaigns" element={<VoiceCampaigns />} />
        <Route path="social-media" element={<SocialMediaDashboard />} />
        <Route path="learning" element={<LearningDashboard />} />
        <Route path="settings" element={<GeneralSettings />} />
        <Route path="settings/passwords" element={<PasswordManager />} />
        <Route path="contact-manager" element={<VendorManagement />} />
        <Route path="marketplace" element={<Marketplace />} />
        {/* Add other admin routes */}
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
