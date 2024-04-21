import { useFeatureContext } from './FeatureContext';

export const FeatureGuard = ({ featureName, children }) => {
  const features = useFeatureContext();
  const feature = features.find((feature) => feature.name === featureName);
  if (!feature || !feature.enabled) {
    return null;
  }
  return children;
};
