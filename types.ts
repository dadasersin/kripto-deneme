
// Import React to resolve React namespace for types
import React from 'react';

export type ViewState = 
  | 'DASHBOARD' 
  | 'APP_BUILDER' 
  | 'CRYPTO_BOT' 
  | 'MEDIA' 
  | 'SETTINGS' 
  | 'REQUESTS' 
  | 'AI_IMAGE' 
  | 'AI_SEARCH' 
  | 'AI_VOICE';

export interface StatCard {
  label: string;
  value: string;
  color: string;
}

export interface ModuleItem {
  id: ViewState;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
}

export interface CryptoBotStat {
  label: string;
  value: string;
  color: string;
  trend?: number[];
}
