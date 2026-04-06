import React from 'react';
import {MOCK_LANDING_DATA} from '../data/mockLandingData';
import {fetchLandingData} from '../services/landingApi';
import {LandingData, LandingMode} from '../types/landing';

type LandingState = {
  data: LandingData;
  isLoading: boolean;
  error: string | null;
};

export function useLandingData(mode: LandingMode): LandingState {
  const [data, setData] = React.useState<LandingData>(MOCK_LANDING_DATA);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    if (mode === 'demo') {
      setData(MOCK_LANDING_DATA);
      setIsLoading(false);
      setError(null);
      return () => {
        isMounted = false;
      };
    }

    setIsLoading(true);
    setError(null);

    fetchLandingData()
      .then(nextData => {
        if (!isMounted) {
          return;
        }

        setData(nextData);
      })
      .catch((nextError: unknown) => {
        if (!isMounted) {
          return;
        }

        setData(MOCK_LANDING_DATA);
        setError(nextError instanceof Error ? nextError.message : 'Unable to load live data');
      })
      .finally(() => {
        if (!isMounted) {
          return;
        }

        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [mode]);

  return {data, isLoading, error};
}
