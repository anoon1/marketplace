import { Suspense, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ListingDetailsComp from '../../components/ListingDetailsComp';
import config from '../../config/configuration_keys.json'

const ListingDetails = () => {
    const { id } = useParams()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)

    const getUserToken = localStorage.getItem('usertoken');
    useEffect(() => {
        setLoading(true)
        fetch(`${config.baseApiUrl}getSingleListing`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "token": getUserToken,
                list_id: id
            }),
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => {
                if (result.data) {
                    console.log('Datatatatatata',result.data)
                    setData(result.data)
                    setLoading(false)
                }
            })
            .catch(error => console.log('error', error));
    }, [getUserToken, id])
    return (
        <>
            <div className="md:pl-[72px] pl-[0] md:pr-[48px] pr-[0]">
                {!loading && data ?
                    <ListingDetailsComp data={data}/>
                    :
                    <p>loading</p>
                }
            </div>
        </>
    );
};

export default ListingDetails;