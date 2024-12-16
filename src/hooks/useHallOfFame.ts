import { Player } from '@/_common/interfaces/Player';
import { useState, useEffect } from 'react';

const useHallOfFame = (session: any) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!session) return;

    const fetchHallOfFame = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/player/hall/');
        const data = await res.json();
        setPlayers(data.data);
      } catch (error) {
        console.error('Failed to fetch Hall of Fame:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHallOfFame();
  }, [session]);

  return { players, loading };
};

export default useHallOfFame;