import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import ApiService from '../services/api-service';

export function ProductView() {
    const params = useParams();
    const [group, setGroup] = useState({});

    useEffect(() => {
        (async () => {
            const service = new ApiService();
            const groupData = await service.getItemNutrition(params.id);
            setGroup(groupData);
            console.log(groupData)
        })();
    }, [params.id]);

    return (
        <div className="row row-cols-1 row-cols-lg-4 align-items-stretch g-4 py-5">
            <div className="col-md-7 col-lg-8">
                <form className="needs-validation">
                    <div className="row g-3">
                        <div className="col-sm-6">
                            <label htmlFor="musicGroupId" className="form-label">Protein</label>
                            <input type="text" className="form-control" id="musicGroupId" value={group[18].varde + "g"} readOnly />
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="name" className="form-label">Carbohydrates</label>
                            <input type="text" className="form-control" id="name" value={group[53].varde + "g"} readOnly />
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="establishedYear" className="form-label">Fat</label>
                            <input type="text" className="form-control" id="establishedYear" value={group[31].varde + "g"} readOnly />
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="strGenre" className="form-label">Fiber</label>
                            <input type="text" className="form-control" id="strGenre" value={group[29].varde + "g"} readOnly />
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="numberartists" className="form-label">Sugar</label>
                            <input type="text" className="form-control" id="numberartists" value={group[12].varde + "g"} readOnly />
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="numberalbums" className="form-label">Energy (kcal)</label>
                            <input type="text" className="form-control" id="numberalbums" value={group[50].varde + "Kcal"} readOnly />
                        </div>
                    </div>
                </form>
                <div className="mt-3">
                    <Link to={`/groupedit/${group.musicGroupId}`} className="custom-btn">
                        Add to favourites
                    </Link>
                </div>
            </div>
        </div>
    );
}