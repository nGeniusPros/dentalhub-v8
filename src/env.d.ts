interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_SUPABASE_JWT_SECRET: string
  readonly VITE_FIREBASE_API_KEY: string
  VITE_SUPABASE_SERVICE_ROLE_KEY: string
  VITE_SUPABASE_SERVICE_PUBLIC_KEY: string
  VITE_INSTANTLY_API_KEY: string
  VITE_BEEHIIV_API_KEY: string
  VITE_BEEHIIV_PUBLICATION_ID: string
  VITE_RETELL_API_KEY: string
  VITE_RETELL_AGENT_1_ID: string
  VITE_RETELL_AGENT_1_LLM: string
  VITE_RETELL_AGENT_1_PHONE: string
  VITE_RETELL_AGENT_2_ID: string
  VITE_RETELL_AGENT_2_LLM: string
  VITE_RETELL_AGENT_2_PHONE: string
  VITE_RETELL_AGENT_3_ID: string
  VITE_RETELL_AGENT_3_LLM: string
  VITE_RETELL_AGENT_3_PHONE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
