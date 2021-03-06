import React, {useCallback, useEffect, useState} from "react";
import NavbarFeature from "../Feature/NavbarFeature";
import axios from "axios";
import {localAddress} from "../../config/CommonConst";
import HeaderFeature from "../Feature/HeaderFeature";
import TrekInformationFeature from "../Feature/TrekInformationFeature";
import TrekDescriptionFeature from "../Feature/TrekDescriptionFeature";

const ViewTrekPage: React.ComponentType = () => {

    const formatPageHref = useCallback((url) => {
        let urlSeparate = url.replace('http://localhost:3000/', '');
        return urlSeparate.split('/');
    }, []);

    /*******************************************************************************************************************
     *                                          STATE
     ******************************************************************************************************************/

    const [trek, setTrek] = useState<any>({});
    const [dataUrl, setDataUrl] = useState<any>({});
    const [loadData, setLoadData] = useState<boolean>(false);

    /*******************************************************************************************************************
     *                                          EFFECT
     ******************************************************************************************************************/

    useEffect(() => {
        setLoadData(true);
    }, [setLoadData]);

    useEffect(() => {
        const url = formatPageHref(window.location.href);
        setDataUrl({
            entity : url[0],
            idEntity : url[1]
        })
    }, [formatPageHref]);

    useEffect(() => {
        if(loadData) {
            axios
                .get(localAddress + dataUrl.idEntity)
                .then(response => {
                    setTrek(response.data);
                });
            setLoadData(false);
        }
    }, [loadData, dataUrl]);

    /*******************************************************************************************************************
     *                                          RENDER
     ******************************************************************************************************************/

    return (
        <div className="body-layout">
            <NavbarFeature />
            <HeaderFeature />
            <TrekInformationFeature
                trek={trek}
            />
            <div className="row m-4">
                <TrekDescriptionFeature
                    description={trek.description}
                />
            </div>
        </div>
    );
}

export default ViewTrekPage;