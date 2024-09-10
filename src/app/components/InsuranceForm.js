import React, { useState, useEffect } from "react";
import styles from  '../style.css'; // Ensure this path is correct

const InsuranceForm = ({
  formId,
  insuranceCompanyId,
  policeNumberId,
  insuranceAgencyId,
  validityStartId,
  validityEndId,
  formData,
  setFormData
}) => {
  const { insuranceCompany, policeNumber, insuranceAgency } = formData;

  const updatePoliceNumber = () => {
    let selectedValue = insuranceCompany;

    if (policeNumber) {
      let splitNumber = policeNumber.split('/');
      if (splitNumber.length > 1) {
        let firstPart = splitNumber[0];
        let secondPart = splitNumber[1];

        if (selectedValue === 'CAAT') {
          setFormData(`${formId}_insuranceAgency`, secondPart);
        } else if (firstPart.length >= 3 && firstPart.length <= 7) {
          setFormData(`${formId}_insuranceAgency`, firstPart);
        }
      }
    } else {
      setFormData(`${formId}_insuranceAgency`, "");
    }
  };

  useEffect(() => {
    updatePoliceNumber();
  }, [insuranceCompany, policeNumber]);

  return (
    <div className="insurance-form" id={formId}>
      <div className="form-group">
        <label htmlFor={insuranceCompanyId} style={{ fontWeight: "bold" }}>
          Ste d&apos;assurances: شركة التأمين{" "}
        </label>
        <select
          id={insuranceCompanyId}
          className="form-control"
          value={insuranceCompany}
          onChange={(e) => setFormData(`${formId}_insuranceCompany`, e.target.value)}
        >
          <option value="">
            Selectionner l&apos;assurance اختر شكة التأمين
          </option>
          <option value="CAAR">CAAR</option>
          <option value="SAA">SAA</option>
          <option value="MAATEC">MAATEC</option>
          <option value="CNMA">CNMA</option>
          <option value="CAAT">CAAT</option>
          <option value="CIAR">CIAR</option>
          <option value="GIG">GIG</option>
          <option value="TRUST">TRUST</option>
          <option value="SALAMA">SALAMA</option>
          <option value="CASH">CASH</option>
          <option value="GAM">GAM</option>
          <option value="ALLIANCE">ALLIANCE</option>
          <option value="Takaful">Takaful</option>
          <option value="AXA">AXA</option>        </select>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor={validityStartId} style={{ fontWeight: "bold" }}>
            Attest valable du: <br/> صالح من
          </label>
          <input
  type="date"
  id={validityStartId}
  name="validityStart"
  className="form-control"
  value={formData.validityStart || ''}
  onChange={(e) => setFormData(`${formId}_validityStart`, e.target.value)}
/>
        </div>
        <div className="col">
          <label htmlFor={validityEndId} style={{ fontWeight: "bold" }}>
            au: <br/>حتى
          </label>
          <input
  type="date"
  id={validityEndId}
  name="validityEnd"
  className="form-control"
  value={formData.validityEnd || ''}
  onChange={(e) => setFormData(`${formId}_validityEnd`, e.target.value)}
/>

        </div>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor={policeNumberId} style={{ fontWeight: "bold" }}>
            N°Police: رقم
          </label>
          <input
            id={policeNumberId}
            type="text"
            name="police-number"
            className="form-control"
            value={policeNumber}
            onChange={(e) => setFormData(`${formId}_policeNumber`, e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor={insuranceAgencyId} style={{ fontWeight: "bold" }}>
          Agence: الوكالة
        </label>
        <input
          type="text"
          id={insuranceAgencyId}
          name="insurance-agency"
          className="form-control"
          value={insuranceAgency}
          readOnly
        />
      </div>
    </div>
  );
};

export default InsuranceForm;
