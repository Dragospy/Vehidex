import { useContext, createContext, type PropsWithChildren, useState, useEffect } from 'react';
import { vehicle } from '../types/vehicle';
import { supabase } from '@/utils/supabase';

type VehicleContextType = {
    vehicles: vehicle[] | null;
    refreshVehicles: () => Promise<void>;    
};

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

// This hook can be used to access the user info.
export function useVehiclesContext() {
  const value = useContext(VehicleContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <CurrentshopProvider />');
    }
  }
  return value;
}



export function VehicleContextProvider({ children}: PropsWithChildren ) {
    const [vehicles, setVehicles] = useState<vehicle[]>([]);

    const refreshVehicles = async () => {
        let { data: fetchedCars, error } = await supabase.from('cars').select('*')

        if (error) {
        console.error('Error fetching Cars:', error.message);
        return;
        }

        if (fetchedCars && fetchedCars.length > 0) {
        setVehicles(fetchedCars);
        }
    
    }

    useEffect(() => { //Gives the vehicles when the app is opened
        refreshVehicles();
    }, []);

    return (
        <VehicleContext.Provider value={{vehicles, refreshVehicles}}>
        {children}
        </VehicleContext.Provider>
    );
}