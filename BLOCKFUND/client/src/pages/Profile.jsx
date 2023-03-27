import React, { useState, useEffect } from 'react'
import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context'

const Profile = () => {
    const [campaigns, setCampaigns] = useState([]);
    const { contract, getUserCampaigns } = useStateContext();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(contract) {
            setIsLoading(true);
            const fetchCampaigns = async () => {
                const data = await getUserCampaigns();
                setCampaigns(data);
                setIsLoading(false);
            }
            fetchCampaigns();
        }
    }, [contract]);

    return (
        <DisplayCampaigns 
            title="User Campaigns"
            isLoading={isLoading}
            campaigns={campaigns}
        />
    )
}

export default Profile
