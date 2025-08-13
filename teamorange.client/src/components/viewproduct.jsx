import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import ApiService from '../services/api-service';
import '../App.css';

export function ViewProduct({ group, groupName }) {
  const params = useParams();
  const [nutritionData, setnutritionData] = useState(group || null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const [localGroupName, setLocalGroupName] = useState("");
  const navigate = useNavigate();

  const [baseValues, setBaseValues] = useState({
    protein: 0,
    carbohydrates: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    energy: 0
  });
  const [currentValues, setCurrentValues] = useState({
    protein: 0,
    carbohydrates: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    energy: 0
  });
  const [quantity, setQuantity] = useState(100);

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 800;
      setIsMobile(newIsMobile);

      if (!newIsMobile && params.id) {
        navigate('/products');
      }
    };

    window.addEventListener('resize', handleResize);

    const fetchnutritionData = async () => {
      if (isMobile && params.id) {
        try {
          const service = new ApiService();
          const nutritionData = await service.getItemNutrition(params.id);
          const groupData = await service.getItemById(params.id);
          setnutritionData(nutritionData);
          setLocalGroupName(groupData.namn);

          const base = {
            protein: nutritionData[18]?.varde || 0,
            carbohydrates: nutritionData[53]?.varde || 0,
            fat: nutritionData[31]?.varde || 0,
            fiber: nutritionData[29]?.varde || 0,
            sugar: nutritionData[12]?.varde || 0,
            energy: nutritionData[50]?.varde || 0
          };

          setBaseValues(base);
          setCurrentValues(base);
        } catch (error) {
          console.error("Failed to fetch group data:", error);
        } finally {
          setLoading(false);
        }
      } else if (group) {
        setnutritionData(group);
        setLoading(false);

        const base = {
          protein: group[18]?.varde || 0,
          carbohydrates: group[53]?.varde || 0,
          fat: group[31]?.varde || 0,
          fiber: group[29]?.varde || 0,
          sugar: group[12]?.varde || 0,
          energy: group[50]?.varde || 0
        };

        setBaseValues(base);
        setCurrentValues(base);
      }
    };

    fetchnutritionData();

    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, params.id, group]);

  const updateValues = (newQuantity) => {
    if (newQuantity < 0) {
      newQuantity = 0;
    }

    const factor = newQuantity / 100;

    setCurrentValues({
      protein: baseValues.protein * factor,
      carbohydrates: baseValues.carbohydrates * factor,
      fat: baseValues.fat * factor,
      fiber: baseValues.fiber * factor,
      sugar: baseValues.sugar * factor,
      energy: baseValues.energy * factor
    });

    setQuantity(newQuantity);
  };

  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;

    if (/^\d*$/.test(newQuantity)) {
      setQuantity(newQuantity);
      updateValues(newQuantity === '' ? 0 : parseInt(newQuantity, 10));
    }
  };

  if (loading) {
    return <div className="text-center text-white">Hämtar näringsinformation...</div>;
  }

  if (!nutritionData) {
    return <div>Error: Ingen data är tillgänglig.</div>;
  }

  return (
    <div>
      {isMobile && (
        <div className="product-view-container m-2">
          <div className="row row-cols-1 row-cols-lg-4 align-items-stretch g-4 p-5 justify-content-center">
            <div className="col-md-7 col-lg-8">
              <h4 className="fw-bold text-center pb-4">{localGroupName || "Group Name Not Available"}</h4>
              <form className="needs-validation text-center">
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="protein" className="form-label fw-bold fs-6">Protein</label>
                    <div className="readonly-value">{currentValues.protein.toFixed(2)} g</div>
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="carbohydrates" className="form-label fw-bold fs-6">Kolhydrater</label>
                    <div className="readonly-value">{currentValues.carbohydrates.toFixed(2)} g</div>
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="fat" className="form-label fw-bold fs-6">Fett</label>
                    <div className="readonly-value">{currentValues.fat.toFixed(2)} g</div>
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="fiber" className="form-label fw-bold fs-6">Fiber</label>
                    <div className="readonly-value">{currentValues.fiber.toFixed(2)} g</div>
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="sugar" className="form-label fw-bold fs-6">Socker</label>
                    <div className="readonly-value">{currentValues.sugar.toFixed(2)} g</div>
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="energy" className="form-label fw-bold fs-6">Energi (cal/100g)</label>
                    <div className="readonly-value">{currentValues.energy.toFixed(2)} cal</div>
                  </div>
                </div>
              </form>
              <div className="mt-3 text-center">
                <label htmlFor="quantity" className="form-label d-block fw-bold fs-4">
                  <br /> Skriv in din egna gram-kvantitet.
                  <br />
                  Kvantitet (g):
                </label>
                <input
                  type="number"
                  className="form-control d-inline-block w-auto"
                  id="quantity"
                  value={quantity ? Number(quantity) : ''}
                  onChange={handleQuantityChange}
                  min="0"
                  step="1"
                />
              </div>
            
            </div>
            
          </div>
          <div className="mt-3 d-flex justify-content-center mb-4">
            <Link to={`/products`} className="btn btn-light">
              Tillbaka till söklistan
            </Link>
          </div>
        </div>
      )}
      {!isMobile && (
        <div className="row row-cols-1 row-cols-lg-4 align-items-stretch g-4 py-5 justify-content-center">
          <div className="col-md-7 col-lg-8">
            <h4 className="text-center pb-4 fw-bold">{groupName || "Group Name Not Available"}</h4>
            <form className="needs-validation text-center">
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="protein" className="form-label fw-bold fs-6">Protein</label>
                  <div className="readonly-value">{currentValues.protein.toFixed(2)} g</div>
                </div>
                <div className="col-sm-6">
                  <label htmlFor="carbohydrates" className="form-label fw-bold fs-6">Kolhydrater</label>
                  <div className="readonly-value">{currentValues.carbohydrates.toFixed(2)} g</div>
                </div>
                <div className="col-sm-6">
                  <label htmlFor="fat" className="form-label fw-bold fs-6">Fett</label>
                  <div className="readonly-value">{currentValues.fat.toFixed(2)} g</div>
                </div>
                <div className="col-sm-6">
                  <label htmlFor="fiber" className="form-label fw-bold fs-6">Fiber</label>
                  <div className="readonly-value">{currentValues.fiber.toFixed(2)} g</div>
                </div>
                <div className="col-sm-6">
                  <label htmlFor="sugar" className="form-label fw-bold fs-6">Socker</label>
                  <div className="readonly-value">{currentValues.sugar.toFixed(2)} g</div>
                </div>
                <div className="col-sm-6">
                  <label htmlFor="energy" className="form-label fw-bold fs-6">Energi (cal/100g)</label>
                  <div className="readonly-value">{currentValues.energy.toFixed(2)} cal</div>
                </div>
              </div>
            </form>
            <div className="mt-3 text-center">
              <label htmlFor="quantity" className="form-label d-block fw-bold fs-4"><br /> Skriv in din egna gram-kvantitet.
                <br />
                  Kvantitet (g):</label>
              <input
                type="number"
                className="form-control d-inline-block w-auto"
                id="quantity"
                value={quantity ? Number(quantity) : ''}
                onChange={handleQuantityChange}
                min="0"
                step="1"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
