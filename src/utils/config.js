// Utility to access Docusaurus config values
// This allows components to access custom fields defined in docusaurus.config.js
const getDocusaurusConfig = () => {
  if (typeof window !== 'undefined' && window.__DOCUSAURUS__) {
    return window.__DOCUSAURUS__.config || {};
  }
  return {};
};

// Get the API URL from Docusaurus config
export const getApiUrl = () => {
  const config = getDocusaurusConfig();
  return config.customFields?.NEXT_PUBLIC_API_URL || 'https://taha293-hackathon1.hf.space';
};