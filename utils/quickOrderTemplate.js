const TEMPLATE_KEY = "quickOrderTemplate";

const getTemplateItems = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(TEMPLATE_KEY)) || [];
};

const setTemplateItems = (items) => {
  localStorage.setItem(TEMPLATE_KEY, JSON.stringify(items));
};