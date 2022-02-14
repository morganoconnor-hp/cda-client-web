import React, {useCallback, useState} from "react";
import axios from "axios";
import ModalRemoveElement from "../Elements/ModalRemoveElement";

interface Props {
    trek: any;
    setLoadData : Function;
    idTrek : string;
    parameters : any;
}

const DeleteTrekFeature: React.ComponentType<Props> = ({
    trek,
    setLoadData,
    idTrek
}) => {

    /*******************************************************************************************************************
     *                                          state
     ******************************************************************************************************************/

    const [show, setShow] = useState(false);

    /*******************************************************************************************************************
     *                                          callback
     ******************************************************************************************************************/

    const handleRemove = useCallback((e : any) => {
        axios
            .delete("http://localhost:1030/api/trek/" + idTrek)
            .then(response => {
                console.log(response);
            });
        setLoadData(true)
        handleClose()
    }, [idTrek, setLoadData]);

    const handleClose = () => setShow(false);

    /*******************************************************************************************************************
     *                                          effect
     ******************************************************************************************************************/

    /*******************************************************************************************************************
     *                                          render
     ******************************************************************************************************************/

    return (
        <ModalRemoveElement
            nameTrek={trek.name}
            buttonElement={
                <>
                    <i className="fas fa-trash" />
                </>
            }
            titleModal={"Supprimer le trek"}
            handleRemove={handleRemove}
            show={show}
            setShow={setShow}
            handleClose={handleClose}
        />
    );
}

export default DeleteTrekFeature;