import React, { useState, useEffect } from 'react'
import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context'

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getCampaigns } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(contract) {
        setIsLoading(true);
        const fetchCampaigns = async () => {
            const data = await getCampaigns();
            setCampaigns(data);
            setIsLoading(false);
        }
        fetchCampaigns();
    }
  }, [address, contract]);

  return (
    <DisplayCampaigns 
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Home
