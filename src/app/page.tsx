"use client";

import { useChargily } from "@/hooks/use-chargily";
import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Script from "next/script";
import { useEffect } from 'react';
import WilayaCommuneForm from '../app/components/WilayaCommuneForm';
import CustomSelect from '../app/components/CustomSelect';
import InsuranceForm from '../app/components/InsuranceForm';
import CarSelectionComponent from '../app/components/CarSelectionComponent';
import AccidentCircumstances from '../app/components/AccidentCircumstances';
import PDFComponent from '../app/components/PdfGenerator';
import { Cairo } from '@next/font/google';
import { useSearchParams } from "next/navigation"; // Import useSearchParams to access query parameters
import LoadingOverlay from "../app/components/LoadingOverlay";
import Footer from "../app/components/footer";

const cairo = Cairo({
  weight: [ '700'], // You can specify weights here
  subsets: ['latin', 'arabic'], // Use 'arabic' subset if you're working with Arabic text
});
import ImageDisplay from '../app/components/ImageDisplay';
const options1 = [
  { iconClass: 'fas fa-car', text: '  Choisissez votre type', value: 'car10', id: 'car10' },
  { iconClass: 'fas fa-car', text: 'Véhicule particulier', value: 'car1', id: 'car1' },
  { iconClass: 'fas fa-truck', text: 'Véhicule utilitaire', value: 'car2', id: 'car2' },
  { iconClass: 'fas fa-truck-front', text: 'Camion', value: 'car3', id: 'car3' },
  { iconClass: 'fas fa-motorcycle', text: 'Moto', value: 'car5', id: 'car5' },
  { iconClass: 'fas fa-bus', text: 'Bus', value: 'car4', id: 'car4' }
];
const options2 = [

  { iconClass: 'fas fa-car', text: '  Choisissez votre type', value: 'car10', id: 'car10' },
  { iconClass: 'fas fa-car', text: 'Véhicule particulier', value: 'car11', id: 'car11' },
  { iconClass: 'fas fa-truck', text: 'Véhicule utilitaire', value: 'car12', id: 'car12' },
  { iconClass: 'fas fa-truck-front', text: 'Camion', value: 'car13', id: 'car13' },
  { iconClass: 'fas fa-motorcycle', text: 'Moto', value: 'car15', id: 'car15' },
  { iconClass: 'fas fa-bus', text: 'Bus', value: 'car14', id: 'car14' }
];
export default function Home() {
  const [inputText, setInputText] = useState('');

  const { pay } = useChargily();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState<boolean>(false); // New state for payment success
  const searchParams = useSearchParams(); // Get query parameters using useSearchParams
  const [showPDFComponent, setShowPDFComponent] = useState<boolean>(false); // State to control visibility of PDFComponent

  // Check if the query parameter indicates payment success
  useEffect(() => {
    if (searchParams.get("payment") === "success") {
      setIsPaymentSuccess(true); 
    }
  }, [searchParams]);

  useEffect(() => {
    if (isPaymentSuccess) {
      setShowPDFComponent(true);
  
      const timer = setTimeout(() => {
        setShowPDFComponent(false);
      }, 900000); // 15 minutes in milliseconds
  
      return () => clearTimeout(timer);
    }
  }, [isPaymentSuccess]);

  useEffect(() => {
    // Set loading state to true when starting to load data from localStorage
    setIsLoading(true);
  
    const savedLoadingState = localStorage.getItem("isLoading");
    if (savedLoadingState === "true") {
      setIsLoading(true);
    }
  
    if (searchParams.get("payment") === "success") {
      setIsPaymentSuccess(true);
  
      // Retrieve form data from localStorage
      const savedFormData = localStorage.getItem("formData");
      if (savedFormData) {
        const parsedFormData = JSON.parse(savedFormData);
        setInputValuee(parsedFormData.inputValuee);
        setSelectedChecklist(parsedFormData.selectedChecklist);
        setInputValuee2(parsedFormData.inputValuee2);
        setSelectedChecklist2(parsedFormData.selectedChecklist2);
        setCaseId(parsedFormData.caseId);
        setCircumstance(parsedFormData.circumstance);
        setBase64Image(parsedFormData.base64Image);
        setOptionId(parsedFormData.optionId);
        setFormData(parsedFormData.formData);
        setSelectedChecklistPoint1(parsedFormData.selectedId1);
        setSelectedChecklistPoint2(parsedFormData.selectedId2);
        setCheckedItems1(parsedFormData.checkedItems1);
        setCheckedItems2(parsedFormData.checkedItems2);
        setInputText(parsedFormData.inputText);
      }
    }
  
    // Clear loading state after all data has been loaded
    setIsLoading(false);
    localStorage.removeItem("isLoading");
  }, [searchParams]);

  // Show PDFComponent only after payment success and for 15 minutes
  useEffect(() => {
    if (isPaymentSuccess) {
      setShowPDFComponent(true);
      const timer = setTimeout(() => {
        setShowPDFComponent(false);
      }, 900000); // 15 minutes in milliseconds

      return () => clearTimeout(timer);
    }
  }, [isPaymentSuccess]);

  const handlePay = async () => {
    // Save form data in localStorage before redirecting
    const formDataToSave = {
      inputValuee,
      selectedChecklist,
      inputValuee2,
      selectedChecklist2,
      caseId,
      circumstance,
      base64Image,
      optionId,
      formData,
      selectedId1: selectedChecklistPoint1,
      selectedId2: selectedChecklistPoint2,
      checkedItems1,
      checkedItems2,
      inputText,
    };

    localStorage.setItem("formData", JSON.stringify(formDataToSave));
    localStorage.setItem("isLoading", "true");
    // Proceed with the payment
    setIsLoading(true);
    await pay({
      product_name: "PDF",
      product_price: 125,
    });
    setIsLoading(false);
    localStorage.removeItem("isLoading");  };



  const [selectedChecklistPoint1, setSelectedChecklistPoint1] = useState(null);
  const [selectedChecklistPoint2, setSelectedChecklistPoint2] = useState(null);
  const [caseId, setCaseId] = useState('');
  const [circumstance, setCircumstance] = useState('');
  const [base64Image, setBase64Image] = useState('');
  const [optionId, setOptionId] = useState(null);
  const [language, setLanguage] = useState('ar');

  const [checkedItems1, setCheckedItems1] = useState({});
  const [checkedItems2, setCheckedItems2] = useState({});
  const handleSelectionComplete = (
    selectedCase: string,
    frenchText: string,
    arabicText: string,
    image: string
  ) => {
    setCaseId(selectedCase);
    if (language === 'fr') {
      setCircumstance(frenchText); // Store the French text if 'fr' is selected
    } else if (language === 'ar') {
      setCircumstance(arabicText); // Store the Arabic text if 'ar' is selected
    }
    setBase64Image(image); // Store the base64 image
  };


  const handleInputChangee = (value: React.SetStateAction<string>) => {
    setInputText(value); // Update the state in the parent component
    console.log("Input in Parent: ", value); // Optional: Log the value
  };


  const handleInputChange = (name: any, value: any) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const [selectedCarType1, setSelectedCarType1] = useState(options1[0].value);
  const [selectedCarType2, setSelectedCarType2] = useState(options2[0].value);
  const [inputValue, setInputValue] = useState(''); // Track input value
  const [selectedChecklist, setSelectedChecklist] = useState([]);
  const [inputValuee, setInputValuee] = useState('');
  const [selectedChecklist2, setSelectedChecklist2] = useState([]);
  const [inputValuee2, setInputValuee2] = useState('');

 const handleChecklistChange = (selectedChecklist: React.SetStateAction<never[]>, inputValuee: React.SetStateAction<string>) => {
    setSelectedChecklist(selectedChecklist);
    setInputValuee(inputValuee);

    console.log('Selected Checklist in Parent:', selectedChecklist);
    console.log('Input Value in Parent:', inputValuee);
  };
  const handleChecklistChange2 = (selectedChecklist2: React.SetStateAction<never[]>, inputValuee2: React.SetStateAction<string>) => {
    setSelectedChecklist2(selectedChecklist2);
    setInputValuee2(inputValuee2);

    console.log('Selected Checklist2 in Parent:', selectedChecklist2);
    console.log('Input Value2 in Parent:', inputValuee2);
  };
  const handleCarTypeChange1 = (id: React.SetStateAction<string>) => {
    const selectedOption = options1.find(option => option.id === id);
    if (selectedOption) {
      setSelectedCarType1(id);
      setFormData(prevFormData => ({
        ...prevFormData,
        vehicleType: selectedOption.text
      }));
    }
  };
  const handleCarTypeChange2 = (id: React.SetStateAction<string>) => {
    const selectedOption2 = options2.find(option => option.id === id);
    if (selectedOption2) {
      setSelectedCarType2(id);
      setFormData(prevFormData => ({
        ...prevFormData,
        vehicleType2: selectedOption2.text
      }));
    }
  };

  const handleFormChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [formData, setFormData] = useState({
    accidentDate: '',
    accidentTime: '',
    vehicleBrand: '',
    carNumber: '',
    vehicleType: '', // Default to the first option's text

    comingFrom: '',
    goingTo: '',
    vehicleType2: '',
    vehicleBrand2: '',

    assurename: '',
    assurefirstname: '',
    assureaddress: '',
    drivername: '',
    driverfirstname: '',
    driveraddress: '',
    driverlicense: '',
    licenseissuedate: '',
    dairachoice: '',
    categorychoice: '',
    form1_insuranceCompany: '',
    form1_policeNumber: '',
    form1_insuranceAgency: '',
    form1_validityStart: '',
    form1_validityEnd: '',
    form2_insuranceCompany: '',
    form2_policeNumber: '',
    form2_insuranceAgency: '',
    form2_validityStart: '',
    form2_validityEnd: '',
    degatsapprents1: '',
    carNumber2: '',
    comingfrom2: '',
    goingto2: '',
    assurename2: '',
    assurefirstname2: '',
    assureaddress2: '',
    drivername2: '',
    driverfirstname2: '',
    driveraddress2: '',
    licenseIssueDate2: '',
    driverlicense2: '',
    wilayaChoice2: '',
    categoryChoice2: '',
    nomAssure: '',
    assureProfession: '',
    assureNum: '',
    gendarmerieChoice: '',
    policeChoice: '',
    wilayaChoice: '',
    conducteurChoice: '',
    conducteurChoice2: '',
    dobConducteur: '',
    agree: '',
    datepdf: '',
    lieupdf: '',
    // add other fields as necessary
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  useEffect(() => {
    // Case list selection handling
    const lists = document.querySelectorAll('#case-list');

    function clearSelection() {
      lists.forEach(list => {
        list.querySelectorAll('li').forEach(li => {
          li.classList.remove('selected');
        });
      });
    }

    lists.forEach(list => {
      list.addEventListener('click', function (event) {
        const target = event.target as HTMLElement; // Type assertion

        if (target && target.tagName === 'LI') {
          clearSelection();
          target.classList.add('selected');
        }
      });
    });

    // Image selection handling
    const imageSelection = document.getElementById('imageSelection');

    function clearImageSelection() {
      if (!imageSelection) return;

      const images = imageSelection.querySelectorAll('img');
      images.forEach(image => {
        image.classList.remove('selected');
      });
    }

    if (imageSelection) {
      imageSelection.addEventListener('click', function (event) {
        const target = event.target as HTMLElement; // Type assertion

        if (target && target.tagName === 'IMG') {
          clearImageSelection();
          target.classList.add('selected');
        }
      });
    }

    // Case list item click handling and proposition selection
    const caseListItems = document.querySelectorAll('#case-list li');
    const propositionsContainer = document.getElementById('propositions');
    const assureCirconstanceInput = document.getElementById('assure-circonstance') as HTMLInputElement;

    function handleCaseClick() {
      if (propositionsContainer) propositionsContainer.innerHTML = '';
      if (assureCirconstanceInput) assureCirconstanceInput.value = '';
    }

    caseListItems.forEach(function (item) {
      item.addEventListener('click', handleCaseClick);
    });

    if (propositionsContainer) {
      propositionsContainer.addEventListener('click', function (event) {
        const target = event.target as HTMLElement; // Type assertion

        if (target && target.classList.contains('proposition')) {
          const previouslySelected = propositionsContainer.querySelector('.proposition.selected');
          if (previouslySelected) {
            previouslySelected.classList.remove('selected');
          }
          target.classList.add('selected');
          assureCirconstanceInput.value = target.textContent || '';
        }
      });
    }
  }, []);
  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <link
          href="https://fonts.googleapis.com/css?family=Raleway:100,200,300,400,500,600,700,800,900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        />
        <title>E-constat Algérie</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />

        <link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="assets/css/font-awesome.css" />
        <link rel="stylesheet" href="assets/css/templatemo-breezed.css" />
        <link rel="stylesheet" href="assets/css/owl-carousel.css" />
        <link rel="stylesheet" href="assets/css/lightbox.css" />
        <link rel="icon" href="assets/images/favicon.ico" type="image/x-icon" />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="assets/pages/waves/css/waves.min.css"
          type="text/css"
          media="all"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="assets/css/bootstrap/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="assets/icon/themify-icons/themify-icons.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="assets/icon/icofont/css/icofont.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="assets/icon/font-awesome/css/font-awesome.min.css"
        />
        <link rel="stylesheet" type="text/css" href="assets/css/style1.css" />
        <link
          rel="stylesheet"
          type="text/css"
          href="assets/css/jquery.mCustomScrollbar1.css"
        />

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

      </head>
      <header className="header-area header-sticky">
        <div className="container">
          <div className="row">
            <div className="col-12 p-0">
              <nav className="main-nav">
                <a className="logo">
                  .E-ConstaT Algérie
                </a>

              </nav>
            </div>
          </div>
        </div>
      </header>
      <div className={`main-banner header-text ${cairo.className}`} id="top">
        <div className="Modern-Slider">
          <div className="item">
            <div className="img-fill">
              <img
                className="img-fluid"
                style={{ opacity: "0.7" }}
                src="assets/images/constat.jpg"
                alt=""
              />
              <div className="text-content text-center">
              <h1 className="display-3 text-success mb-3 text-md-start text-center">
  احصل على تعويضك الأن
</h1>
                <h3 className="display-2 text-light mb-3">
                  هده المعاينة تخص الحوادث المرورية المادية بين سيارتين على الأكثر
                  ولا تخص الحوادث الجسمانية{" "}
                </h3>
                <h3 className="display-3 text-light mb-3">
                  خدمات ملء معاينة الحوادث المرورية بخطوات بسيطة
                </h3>
                <a className="btn btn-outline-light btn-lg" href="#about">
                  كيفية ملء المعاينة ؟
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-down scroll-to-section">
        <a href="#about">
          <i className="fa fa-arrow-down" />
        </a>
      </div>
      {/* ***** Main Banner Area End ***** */}
      {/* ***** About Area Starts ***** */}
      <section className="section" id="about">
        <div className={`container ${cairo.className}`}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-xs-12">
              <div className="left-text-content">
                <div className="section-heading">
                  <h6 >
                    كيفية ملء المعاينة ؟{" "}
                  </h6>
                  <h2 >
                    فيديو توضيحي عن كيفية تسجيل حالتك{" "}
                  </h2>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <a href="#" className="main-button-icon">
                      مشاهدة الفيديو <i className="fa fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-xs-12">
              <div
                style={{
                  flex: "1 1 50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#000",
                  borderRadius: 20
                }}
                className="video-box"
              >
                <video
                  style={{
                    width: "100%",
                    height: "100%",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    border: "none",
                    borderRadius: 20
                  }}
                >
                  <source src="your-video-source.mp4" type="video/mp4" />
                  متصفحك لا يدعم تشغيل الفيديو.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={`pcoded-main-container ${cairo.className}`}>
        <div className="pcoded-wrapper">
          <div className="pcoded-content">
            <div className="pcoded-inner-content">
              <div className="main-body">
                <div className="page-wrapper">
                  <div className="page-body">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="card">
                          <div className="card-header">
                            <h4 style={{ paddingBottom: "2%" }}>
                              CONSTAT AMIABLE D&apos; ACCIDENT AUTOMOBILE / معاينة ودية
                              لحادث سيارة
                            </h4>
                            <h5>
                              à signer obligatoirement par les deux conducteurs /توقع
                              هذه المعاينة إجباريا من طرف السائقين
                            </h5>
                            <div>
                              Ne constitue pas une reconnaissance de responsabilité,
                              mais un relevé des identités 
                              et des faits, servant à l&apos;accéleration du règlement<br /> / لا
                              تشكل إعترافا بالمسؤولية بل كشفا بالبيانات و الوقائع قصد
                              الإسراع بالتسوية
                            </div>
                          </div>
                          <div className="card-block">
                            <form className="form-material">
                              <div className="form-group form-default">
                                <label
                                  htmlFor="accident-date"
                                  style={{ display: "block" }}
                                >
                                  la date d&apos;accident / تاريخ الحادث
                                </label>
                                <p id="result" />
                                <input
                                required 
                                  id="accident-date"
                                  type="date"
                                  name="accidentDate"
                                  value={formData.accidentDate}
                                  onChange={handleChange}
                                  className="form-control"
                                  data-required=""
                                />
                                <span className="form-bar" />
                              </div>
                              <div className="form-group form-default">
                                <label
                                  htmlFor="accident-time"
                                  style={{ display: "block" }}
                                >
                                  l&apos;heure d&apos;accident / الساعة
                                </label>
                                <input required 
                                  id="accident-time"
                                  type="time"
                                  name="accidentTime"
                                  value={formData.accidentTime}
                                  onChange={handleChange}
                                  className="form-control"
                                  data-required=""
                                />
                                <span className="form-bar" />
                              </div>
                              <WilayaCommuneForm formData={formData} handleChange={handleChange} />
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="pcoded-main-container">
              <div className="pcoded-wrapper">
                <div className="pcoded-content">
                  {/* Page-header end */}
                  <div className="pcoded-inner-content">
                    {/* Main-body start */}
                    <div className="main-body">
                      <div className="page-wrapper">

                        <div className="page-body">
                          <div className="row">
                            <div className="col-md-4 ">
                              <div className="card">
                                <div
                                  className="card-header"
                                  style={{ backgroundColor: "#f800531e" }}
                                >
                                  <h3>Véhicule A / السيارة أ</h3>
                                </div>
                                <div
                                  className="card-body"
                                  style={{ backgroundColor: "#f800530e" }}
                                >
                                  <form>
                                    <div className="form-group">
                                      <label htmlFor="car-custom-select" style={{ fontWeight: 'bold' }}>
                                        Type de véhicule / نوع السيارة
                                      </label>
                                      <CustomSelect options={options1} onSelect={handleCarTypeChange1} id="carSelect1" />

                                    </div>
                                    <div className="form-group">
                                      <label
                                        htmlFor="vehicle-brand"
                                        style={{ fontWeight: "bold" }}
                                      >
                                        Marque / الصنف
                                      </label>
                                      <select required
                                        id="vehicleBrand"
                                        className="form-control"
                                        name="vehicleBrand" // This should match the key in your formData
                                        value={formData.vehicleBrand}
                                        onChange={handleChange}
                                      >
                                        <option value="" />
                                        <option value="Renault">
                                          Renault / رينو
                                        </option>
                                        <option value="Peugeot">
                                          Peugeot / بيجو
                                        </option>
                                        <option value="Citroën">
                                          Citroën / سيتروين
                                        </option>
                                        <option value="Dacia">Dacia / داسيا</option>
                                        <option value="Volkswagen">
                                          Volkswagen / فولكس فاجن
                                        </option>
                                        <option value="Hyundai">
                                          Hyundai / هيونداي
                                        </option>
                                        <option value="Kia">Kia / كيا</option>
                                        <option value="Toyota">
                                          Toyota / تويوتا
                                        </option>
                                        <option value="Nissan">Nissan / نيسان</option>
                                        <option value="Ford">Ford / فورد</option>
                                        <option value="Chevrolet">
                                          Chevrolet / شيفروليه
                                        </option>
                                        <option value="Fiat">Fiat / فيات</option>
                                        <option value="Suzuki">
                                          Suzuki / سوزوكي
                                        </option>
                                        <option value="Mitsubishi">
                                          Mitsubishi / ميتسوبيشي
                                        </option>
                                        <option value="Mazda">Mazda / مازدا</option>
                                        <option value="Honda">Honda / هوندا</option>
                                        <option value="Mercedes-Benz">
                                          Mercedes-Benz / مرسيدس بنز
                                        </option>
                                        <option value="BMW">BMW / بي إم دبليو</option>
                                        <option value="Audi">Audi / أودي</option>
                                        <option value="Skoda">Skoda / سكودا</option>
                                        <option value="Chery">Chery / شيري</option>
                                        <option value="Geely">Geely / جيلي</option>
                                        <option value="Jeep">Jeep / جييب</option>
                                        <option value="Volvo">Volvo / فولفو</option>
                                        <option value="Jaguar">
                                          Jaguar / جاكوار
                                        </option>
                                        <option value="LandRover">
                                          LandRover / لاند روفر
                                        </option>
                                        <option value="Maserati">
                                          Maserati / مازيراتي
                                        </option>
                                        <option value="Hummer">Hummer / هامر</option>
                                        <option value="GMC">GMC / جي إم سي</option>
                                        <option value="Dodge">Dodge / دودج</option>
                                        <option value="Porsche">
                                          Porsche / بورش
                                        </option>
                                        <option value="Seat">Seat / سيات</option>
                                        <option value="DFSK">
                                          DFSK / دي اف اس كا
                                        </option>
                                        <option value="Alfa Romeo">
                                          Alfa Romeo / ألفا روميو
                                        </option>
                                        <option value="Aston Martin">
                                          Aston Martin / أستون مارتن
                                        </option>
                                        <option value="Baic">Baic / بايك</option>
                                        <option value="Brilliance">
                                          Brilliance / بريلينس
                                        </option>
                                        <option value="Bugatti">
                                          Bugatti / بوغاتي
                                        </option>
                                        <option value="BYD">BYD / بي واي دي</option>
                                        <option value="Cadillac">
                                          Cadillac / كاديلاك
                                        </option>
                                        <option value="Chana">Chana / شانا</option>
                                        <option value="Changan">
                                          Changan / شانجان
                                        </option>
                                        <option value="Chrysler">
                                          Chrysler / كرايسلر
                                        </option>
                                        <option value="Corvette">
                                          Corvette / كورفيت
                                        </option>
                                        <option value="Daewoo">Daewoo / دايو</option>
                                        <option value="DFM">DFM / دي اف ام</option>
                                        <option value="Daihatsu">
                                          Daihatsu / دايهاتسو
                                        </option>
                                        <option value="DS">DS / دي اس</option>
                                        <option value="Zotye">Zotye / زوتي</option>
                                        <option value="Faw">Faw / فاو</option>
                                        <option value="FOTON">FOTON / فوتون</option>
                                        <option value="Gonow">Gonow / غونوف</option>
                                        <option value="Great Wall">
                                          Great Wall / جريت وول
                                        </option>
                                        <option value="Hafei motors">
                                          Hafei motors / هافي موتورز
                                        </option>
                                        <option value="JMC">JMC / جي ام سي</option>
                                        <option value="Haima">Haima / هايماء</option>
                                        <option value="Infiniti">
                                          Infiniti / إنفينيتي
                                        </option>
                                        <option value="Iran Khodro">
                                          Iran Khodro / إيران خودرو
                                        </option>
                                        <option value="Lada">Lada / لادا</option>
                                        <option value="Lancia">
                                          Lancia / لانشيا
                                        </option>
                                        <option value="Tata">Tata / تاتا</option>
                                        <option value="SsangYong">
                                          SsangYong / سانغ يونغ
                                        </option>
                                        <option value="Sokon">Sokon / سوكون</option>
                                        <option value="Saipa">Saipa / سايبا</option>
                                        <option value="Smart">Smart / سمارت</option>
                                        <option value="Saab">Saab / ساب</option>
                                        <option value="Mini">Mini / ميني</option>
                                        <option value="MG">MG / إم جي</option>
                                        <option value="McLaren">
                                          McLaren / مكلارين
                                        </option>
                                      </select>
                                    </div>
                                    <div className="form-group">
                                      <label
                                        htmlFor="car-number"
                                        style={{ fontWeight: "bold" }}
                                      >
                                        N° D&apos;immatricule Véhicule / ترقيم السيارة
                                      </label>
                                      <input required 
                                        type="text"
                                        id="carNumber"
                                        name="carNumber"
                                        value={formData.carNumber}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="eg: 1001115-112-25"
                                        maxLength={14}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label
                                        htmlFor="coming-from"
                                        style={{ fontWeight: "bold" }}
                                      >
                                        Venant de / القادم من
                                      </label> 
                                      <input required 
                                        type="text"
                                        id="comingFrom"
                                        name="comingFrom"
                                        value={formData.comingFrom}
                                        onChange={handleChange}
                                        className="form-control"
                                        data-required=""
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label
                                        htmlFor="going-to"
                                        style={{ fontWeight: "bold" }}
                                      >
                                        Allant vers / المتجه الى
                                      </label>
                                      <input required 
                                        type="text"
                                        id="going-to"
                                        name="goingTo"
                                        value={formData.goingTo}
                                        onChange={handleChange}
                                        className="form-control"
                                        data-required=""

                                      />
                                    </div>
                                    <div className="form-group">
                                      <h5>
                                        Assuré (voir attestation d&apos;assurance)
                                        <br /> مؤمن (انظر إلى شهادة التأمين :
                                      </h5>
                                      {/*    <div class="icon-paragraph" onclick="showImage()">
                                                                      لشهادة التأمين</p>
                                                              </div>
                                                                  <p>voir exemple d&aposun attestation رؤية مثال
                                                              <div id="imageModal" class="modal">
                                                                  <span class="close"
                                                                      onclick="hideImage()">&times;</span>
                                                                  <div class="modal-content">
                                                                      <img src="assets/images/constat-eg.jpg"
                                                                          alt="Displayed Image"
                                                                          class="display-image" id="displayImage">
                                                                  </div>
                                                              </div>*/}
                                      <div className="row">
                                        <div className="col">
                                          <label
                                            htmlFor="assure-name"
                                            style={{ fontWeight: "bold" }}
                                          >
                                            Nom: اللقب
                                          </label>
                                          <input required 
                                            type="text"
                                            id="assurename"
                                            name="assurename"
                                            className="form-control"
                                            value={formData.assurename}
                                            onChange={handleChange}
                                            data-required=""
                                          />
                                        </div>
                                        <div className="col">
                                          <label
                                            htmlFor="assure-firstname"
                                            style={{ fontWeight: "bold" }}
                                          >
                                            Prénom: الإسم
                                          </label>
                                          <input required 
                                            type="text"
                                            id="assurefirstname"
                                            name="assurefirstname"
                                            className="form-control"
                                            value={formData.assurefirstname}
                                            onChange={handleChange}
                                            data-required=""
                                          />
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <label
                                          htmlFor="driver-address"
                                          style={{ fontWeight: "bold" }}
                                        >
                                          Adresse: العنوان
                                        </label>
                                        <input required 
                                          type="text"
                                          id="assureaddress"
                                          name="assureaddress"
                                          className="form-control"
                                          value={formData.assureaddress}
                                          onChange={handleChange}
                                          data-required=""
                                        />
                                        <InsuranceForm
                                          formId="form1"
                                          insuranceCompanyId="insurance-company-1"
                                          policeNumberId="police-number-1"
                                          insuranceAgencyId="insurance-agency-1"
                                          validityStartId="validity-start-1"
                                          validityEndId="validity-end-1"
                                          formData={{
                                            insuranceCompany: formData.form1_insuranceCompany,
                                            policeNumber: formData.form1_policeNumber,
                                            insuranceAgency: formData.form1_insuranceAgency,
                                            validityStart: formData.form1_validityStart,
                                            validityEnd: formData.form1_validityEnd
                                          }}
                                          setFormData={handleInputChange}
                                        />
                                      </div>
                                    </div>

                                    <div className="form-group">
                                      <h5>
                                        Conducteur (voir permis de conduire) <br/>: السائق
                                        (راجع رخصة القيادة)
                                      </h5>
                                      <div className="row">
                                        <div className="col">
                                          <label
                                            htmlFor="driver-name"
                                            style={{ fontWeight: "bold" }}
                                          >
                                            Nom: اللقب
                                          </label> 
                                          <input required 
                                            type="text"
                                            id="drivername"
                                            name="drivername"
                                            className="form-control"
                                            value={formData.drivername}
                                            onChange={handleChange}
                                            
                                          />
                                        </div>

                                        <div className="col">
                                          <label
                                            htmlFor="driver-firstname"
                                            style={{ fontWeight: "bold" }}
                                          >
                                            Prénom: الإسم
                                          </label>
                                          <input  
                                            data-required=""
                                            type="text"
                                            id="driverfirstname"
                                            name="driverfirstname"
                                            className="form-control"
                                            value={formData.driverfirstname}
                                            onChange={handleChange}
                                            required
                                          />
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <label
                                          htmlFor="driver-address"
                                          style={{ fontWeight: "bold" }}
                                        >
                                          Adresse: العنوان
                                        </label>

                                        <input required 
                                          type="text"
                                          id="driveraddress"
                                          name="driveraddress"
                                          className="form-control"
                                          value={formData.driveraddress}
                                          onChange={handleChange}
                                          
                                        />
                                      </div>
                                      <div className="row">
                                        <div className="col">
                                          <label
                                            htmlFor="driver-license"
                                            style={{ fontWeight: "bold" }}
                                          >
                                            Permis de conduire N°: رقم رخصة السياقة
                                          </label>
                                          <input required 
                                            data-required=""
                                            type="text"
                                            id="driverlicense"
                                            name="driverlicense"
                                            className="form-control"
                                            value={formData.driverlicense}
                                            onChange={handleChange}
                                            
                                          />
                                        </div>
                                        <div className="col">
                                          <label
                                            htmlFor="license-issue-date"
                                            style={{ fontWeight: "bold" }}
                                          >
                                            Délivre le <br/> : صرح في
                                          </label>
                                          <input required 
                                            data-required=""
                                            type="date"
                                            id="licenseissuedate"
                                            name="licenseissuedate"
                                            className="form-control"
                                            value={formData.licenseissuedate}
                                            onChange={handleChange}
                                            
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <label
                                        htmlFor="daira-choice"
                                        style={{ fontWeight: "bold" }}
                                      >
                                        Par la wilaya: من الولاية
                                      </label>
                                      <select required
                                        data-required=""
                                        id="dairachoice"
                                        className="form-control"
                                        value={formData.dairachoice}
                                        onChange={handleChange}

                                        name="dairachoice" // This should match the key in your formData
                                      >
                                        <option value="">
                                          Select Wialaya / اختر الولاية
                                        </option>
                                        <option value="Adrar">Adrar / أدرار</option>
                                        <option value="Chlef">Chlef / الشلف</option>
                                        <option value="Laghouat">
                                          Laghouat / الأغواط
                                        </option>
                                        <option value="Oum El Bouaghi">
                                          Oum El Bouaghi / أم البواقي
                                        </option>
                                        <option value="Batna">Batna / باتنة</option>
                                        <option value="Béjaïa">Béjaïa / بجاية</option>
                                        <option value="Biskra">Biskra / بسكرة</option>
                                        <option value="Béchar">Béchar / بشار</option>
                                        <option value="Blida">Blida / البليدة</option>
                                        <option value="Bouira">
                                          Bouira / البويرة
                                        </option>
                                        <option value="Tamanrasset">
                                          Tamanrasset / تمنراست
                                        </option>
                                        <option value="Tébessa">
                                          Tébessa / تبسة
                                        </option>
                                        <option value="Tlemcen">
                                          Tlemcen / تلمسان
                                        </option>
                                        <option value="Tiaret">Tiaret / تيارت</option>
                                        <option value="Tizi Ouzou">
                                          Tizi Ouzou / تيزي وزو
                                        </option>
                                        <option value="Alger">Alger / الجزائر</option>
                                        <option value="Djelfa">
                                          Djelfa / الجلفة
                                        </option>
                                        <option value="Jijel">Jijel / جيجل</option>
                                        <option value="Sétif">Sétif / سطيف</option>
                                        <option value="Saïda">Saïda / سعيدة</option>
                                        <option value="Skikda">
                                          Skikda / سكيكدة
                                        </option>
                                        <option value="Sidi Bel Abbès">
                                          Sidi Bel Abbès / سيدي بلعباس
                                        </option>
                                        <option value="Annaba">Annaba / عنابة</option>
                                        <option value="Guelma">Guelma / قالمة</option>
                                        <option value="Constantine">
                                          Constantine / قسنطينة
                                        </option>
                                        <option value="Médéa">Médéa / المدية</option>
                                        <option value="Mostaganem">
                                          Mostaganem / مستغانم
                                        </option>
                                        <option value="M&apos;Sila">
                                          M&apos;Sila / المسيلة
                                        </option>
                                        <option value="Mascara">
                                          Mascara / معسكر
                                        </option>
                                        <option value="Ouargla">
                                          Ouargla / ورقلة
                                        </option>
                                        <option value="Oran">Oran / وهران</option>
                                        <option value="3El Bayadh2">
                                          El Bayadh / البيض
                                        </option>
                                        <option value="Illizi">Illizi / إليزي</option>
                                        <option value="Bordj Bou Arréridj">
                                          Bordj Bou Arréridj / برج بوعريريج
                                        </option>
                                        <option value="Boumerdès">
                                          Boumerdès / بومرداس
                                        </option>
                                        <option value="El Tarf">
                                          El Tarf / الطارف
                                        </option>
                                        <option value="Tindouf">
                                          Tindouf / تندوف
                                        </option>
                                        <option value="Tissemsilt">
                                          Tissemsilt / تيسمسيلت
                                        </option>
                                        <option value="El Oued">
                                          El Oued / الوادي
                                        </option>
                                        <option value="Khenchela">
                                          Khenchela / خنشلة
                                        </option>
                                        <option value="Souk Ahras">
                                          Souk Ahras / سوق أهراس
                                        </option>
                                        <option value="Tipaza">
                                          Tipaza / تيبازة
                                        </option>
                                        <option value="Mila">Mila / ميلة</option>
                                        <option value="Aïn Defla">
                                          Aïn Defla / عين الدفلى
                                        </option>
                                        <option value="Naâma">Naâma / النعامة</option>
                                        <option value="Aïn Témouchent">
                                          Aïn Témouchent / عين تموشنت
                                        </option>
                                        <option value="Ghardaïa">
                                          Ghardaïa / غرداية
                                        </option>
                                        <option value="Relizane">
                                          Relizane / غليزان
                                        </option>
                                        <option value="Timimoun">
                                          Timimoun / تيميمون
                                        </option>
                                        <option value="Bordj Badji Mokhtar">
                                          Bordj Badji Mokhtar / برج باجي مختار
                                        </option>
                                        <option value="Ouled Djellal">
                                          Ouled Djellal / أولاد جلال
                                        </option>
                                        <option value="Béni Abbès">
                                          Béni Abbès / بني عباس
                                        </option>
                                        <option value="In Salah">
                                          In Salah / عين صالح
                                        </option>
                                        <option value="In Guezzam54">
                                          In Guezzam / عين قزام
                                        </option>
                                        <option value="Touggourt">
                                          Touggourt / تقرت
                                        </option>
                                        <option value="Djanet">Djanet / جانت</option>
                                        <option value="El M&apos;Ghair">
                                          El M&apos;Ghair / المغير
                                        </option>
                                        <option value="El Menia">
                                          El Menia / المنيعة
                                        </option>
                                      </select>
                                    </div>
                                    <div className="form-group">
                                      <label
                                        htmlFor="category-choice"
                                        style={{ fontWeight: "bold" }}
                                      >
                                        Catégorie: الفئة
                                      </label> 
                                      <select required
                                        id="categorychoice"
                                        className="form-control"
                                        value={formData.categorychoice}
                                        onChange={handleChange}
                                        name="categorychoice" // This should match the key in your formData
                                        data-required=""

                                      >
                                        <option value="">
                                          Select Categorie اختر الفئة
                                        </option>
                                        <option value="A1">A1</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                        <option value="E">E</option>
                                        <option value="F">F</option>
                                      </select>
                                    </div>
                                    <div
                                      className="scroll-container"
                                      style={{ overflowX: "auto" }}
                                    >
                                      <div className="col">
                                        <label
                                          htmlFor="Degats-apprentsA"
                                          style={{ fontWeight: "bold" }}
                                        >
                                          Dégats apparents véhicule A : أضرار واضحة في
                                          المركبة{" "}
                                        </label>

                                      </div>

                                      <ImageDisplay
  type={selectedCarType1}
  onChecklistPointSelect={(point: React.SetStateAction<null>, checkedItems: React.SetStateAction<{}>) => {
    setSelectedChecklistPoint1(point);
    setCheckedItems1(checkedItems);
  }}
  onChecklistChange={handleChecklistChange} // Ensure this is passed correctly
/>
                                      {/* Add more inputs as needed */}
                                    </div>

                                  </form>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="card">
                                <div className="card-header">
                                  <h5>
                                    Mettre une croix (*) dans chacune des cases utiles اجعلوا علامة * داخل
                                    إحدى الخانات الصالحة{" "}
                                  </h5>
                                </div>
                                <div className="bilingual-checkbox p-2">
                                  <input 
                                    className="m-2"
                                    type="checkbox"
                                    id="checkArabic1"
                                    value={formData.degatsapprents1}
                                    onChange={handleChange}
                                  /*onclick="syncCheckboxes('checkArabic')"*/
                                  />
                                  <div className="checkbox-pair ">
                                    <label className="checkbox-label" htmlFor="checkEnglish1">
                                      1) Heurait à l&apos;arriere , en roulant dans le meme sens et sur la meme
                                      file
                                    </label>
                                    <label className="checkbox-label" htmlFor="checkArabic1">
                                      اصطدام من الخلف و كان يسير في نفس اتجاه و على نفس الصف
                                    </label>
                                  </div>
                                </div>
                                <div className="bilingual-checkbox p-2">
                                  <input
                                    className="m-2"
                                    type="checkbox"
                                    id="checkArabic2"
                                  /*  onclick="syncCheckboxes('checkArabic')"*/
                                  />
                                  <div className="checkbox-pair ">
                                    <label /*onclick="document.getElementById('checkArabic').click()"*/>
                                      2) Roulait dans le meme sens et sur une file différente{" "}
                                    </label>
                                    <label /*onclick="document.getElementById('checkEnglish').click()"*/>
                                      يسير في نفس الإتجاه و على صف مختلف{" "}
                                    </label>
                                  </div>
                                </div>
                                <div className="bilingual-checkbox p-2">
                                  <input
                                    className="m-2 "
                                    type="checkbox"
                                    id="checkArabic3"
                                  /*   onclick="syncCheckboxes('checkArabic')"*/
                                  />
                                  <div className="checkbox-pair ">
                                    <span /*onclick="document.getElementById('checkArabic').click()"*/>
                                      3) Roulait en sens inverse{" "}
                                    </span>
                                    <span /*onclick="document.getElementById('checkEnglish').click()"*/>
                                      يسير في الجهة المعاكسة
                                    </span>
                                  </div>
                                </div>
                                <div className="bilingual-checkbox p-2">
                                  <input
                                    className="m-2"
                                    type="checkbox"
                                    id="checkArabic4"
                                  /* onclick="syncCheckboxes('checkArabic')"*/
                                  />
                                  <div className="checkbox-pair ">
                                    <span /*onclick="document.getElementById('checkArabic').click()"*/>
                                      4) Provenait d'une chaussée différente.{" "}
                                    </span>
                                    <span /*onclick="document.getElementById('checkEnglish').click()"*/>
                                      قادما من طريق مختلفة
                                    </span>
                                  </div>
                                </div>
                                <div className="bilingual-checkbox p-2">
                                  <input
                                    className="m-2"
                                    type="checkbox"
                                    id="checkArabic5"
                                  /*    onclick="syncCheckboxes('checkArabic')"*/
                                  />
                                  <div className="checkbox-pair ">
                                    <span /*onclick="document.getElementById('checkArabic').click()"*/>
                                      5) Venait de droit ( dans une carre four)
                                    </span>
                                    <span /*onclick="document.getElementById('checkEnglish').click()"*/>
                                      قادما من اليمين (داخل مفترق)
                                    </span>
                                  </div>
                                </div>
                                <div className="bilingual-checkbox p-2">
                                  <input
                                    className="m-2"
                                    type="checkbox"
                                    id="checkArabic6"
                                  /*    onclick="syncCheckboxes('checkArabic')"*/
                                  />
                                  <div className="checkbox-pair ">
                                    <span /*onclick="document.getElementById('checkArabic').click()"*/>
                                      6) S&apos;engageait sur une place à sens giratoire
                                    </span>
                                    <span /*onclick="document.getElementById('checkEnglish').click()"*/>
                                      داخلا في ساحة ذات إتجاه دائري
                                    </span>
                                  </div>
                                </div>
                                <div className="bilingual-checkbox p-2">
                                  <input
                                    className="m-2"
                                    type="checkbox"
                                    id="checkArabic7"
                                  /*onclick="syncCheckboxes('checkArabic')"*/
                                  />
                                  <div className="checkbox-pair ">
                                    <span /*onclick="document.getElementById('checkArabic').click()"*/>
                                      7) Roulait sur une place à sens giratoire{" "}
                                    </span>
                                    <span /*onclick="document.getElementById('checkEnglish').click()"*/>
                                      سائرا في ساحة ذات إتجاه دائري{" "}
                                    </span>
                                  </div>
                                </div>
                                <div className="bilingual-checkbox p-2">
                                  <input
                                    className="m-2"
                                    type="checkbox"
                                    id="checkArabic8"
                                  /*  onclick="syncCheckboxes('checkArabic')"*/
                                  />
                                  <div className="checkbox-pair ">
                                    <span /*onclick="document.getElementById('checkArabic').click()"*/>
                                      8) En stationnement{" "}
                                    </span>
                                    <span /*onclick="document.getElementById('checkEnglish').click()"*/>
                                      في حالة وقوف
                                    </span>
                                  </div>
                                </div>
                                <div className="bilingual-checkbox p-2">
                                  <input
                                    className="m-2"
                                    type="checkbox"
                                    id="checkArabic9"
                                  /*  onclick="syncCheckboxes('checkArabic')"*/
                                  />
                                  <div className="checkbox-pair ">
                                    <span /*onclick="document.getElementById('checkArabic').click()"*/>
                                      9) Quittait un stationnement{" "}
                                    </span>
                                    <span /*onclick="document.getElementById('checkEnglish').click()"*/>
                                      خارجا من الوقوف
                                    </span>
                                  </div>
                                </div>
                                <div className="bilingual-checkbox p-2">
                                  <input
                                    className="m-2"
                                    type="checkbox"
                                    id="checkArabic10"
                                  /*     onclick="syncCheckboxes('checkArabic')"*/
                                  />
                                  <div className="checkbox-pair ">
                                    <span /*onclick="document.getElementById('checkArabic').click()"*/>
                                      10) Pronait un stationnement{" "}
                                    </span>
                                    <span /*onclick="document.getElementById('checkEnglish').click()"*/>
                                      على وشك الوقوف
                                    </span>
                                  </div>
                                </div>
                                <div className="bilingual-checkbox p-2">
                                  <input
                                    className="m-2"
                                    type="checkbox"
                                    id="checkArabic11"
                                  /* onclick="syncCheckboxes('checkArabic')"*/
                                  />
                                  <div className="checkbox-pair ">
                                    <span /*onclick="document.getElementById('checkArabic').click()"*/>
                                      11) Reculait{" "}
                                    </span>
                                    <span /*onclick="document.getElementById('checkEnglish').click()"*/>
                                      يتأخر
                                    </span>
                                  </div>
                                </div>
                                <div className="bilingual-checkbox p-2">
                                  <input
                                    className="m-2"
                                    type="checkbox"
                                    id="checkArabic12"
                                  /*  onclick="syncCheckboxes('checkArabic')"*/
                                  />
                                  <div className="checkbox-pair ">
                                    <span /*onclick="document.getElementById('checkArabic').click()"*/>
                                      12) Doublait{" "}
                                    </span>
                                    <span /*onclick="document.getElementById('checkEnglish').click()"*/>
                                      يتجاوز
                                    </span>
                                  </div>
                                </div>
                                <div className="bilingual-checkbox p-2">
                                  <input
                                    className="m-2"
                                    type="checkbox"
                                    id="checkArabic13"
                                  /*  onclick="syncCheckboxes('checkArabic')"*/
                                  />
                                  <div className="checkbox-pair ">
                                    <span /*onclick="document.getElementById('checkArabic').click()"*/>
                                      13) Dépassement irrégulier{" "}
                                    </span>
                                    <span /*onclick="document.getElementById('checkEnglish').click()"*/>
                                      تجاوز غير قانوني
                                    </span>
                                  </div>
                                </div>
                                <div className="bilingual-checkbox p-2">
                                  <input
                                    className="m-2"
                                    type="checkbox"
                                    id="checkArabic14"
                                  /*  onclick="syncCheckboxes('checkArabic')"*/
                                  />
                                  <div className="checkbox-pair ">
                                    <span /*onclick="document.getElementById('checkArabic').click()"*/>
                                      14) Changeait de file{" "}
                                    </span>
                                    <span /*onclick="document.getElementById('checkEnglish').click()"*/>
                                      يغير خط السير{" "}
                                    </span>
                                  </div>
                                </div>
                                <div className="bilingual-checkbox p-2">
                                  <input
                                    className="m-2"
                                    type="checkbox"
                                    id="checkArabic15"
                                  /*onclick="syncCheckboxes('checkArabic')"*/
                                  />
                                  <div className="checkbox-pair ">
                                    <span /*onclick="document.getElementById('checkArabic').click()"*/>
                                      15) Virait a droite{" "}
                                    </span>
                                    <span /*onclick="document.getElementById('checkEnglish').click()"*/>
                                      ينحرف إلى اليمين{" "}
                                    </span>
                                  </div>
                                </div>
                                <div className="bilingual-checkbox p-2">
                                  <input
                                    className="m-2"
                                    type="checkbox"
                                    id="checkArabic16"
                                  /*  onclick="syncCheckboxes('checkArabic')"*/
                                  />
                                  <div className="checkbox-pair ">
                                    <span /*onclick="document.getElementById('checkArabic').click()"*/>
                                      16) Virait a gauche{" "}
                                    </span>
                                    <span /*onclick="document.getElementById('checkEnglish').click()"*/>
                                      ينحرف إلى اليسار
                                    </span>
                                  </div>
                                </div>
                                <div className="bilingual-checkbox p-2">
                                  <input
                                    className="m-2"
                                    type="checkbox"
                                    id="checkArabic17"
                                  /*     onclick="syncCheckboxes('checkArabic')"*/
                                  />
                                  <div className="checkbox-pair ">
                                    <span /*onclick="document.getElementById('checkArabic').click()"*/>
                                      17) S&apos;engageait dans un parking un lieu privé , un chemin de terre{" "}
                                    </span>
                                    <span /*onclick="document.getElementById('checkEnglish').click()"*/>
                                      يدخل في موقف عمومي في محل خصوصي في طريق غير معبدة
                                    </span>
                                  </div>
                                </div>
                                <div className="bilingual-checkbox p-2">
                                  <input
                                    className="m-2"
                                    type="checkbox"
                                    id="checkArabic18"
                                  /* onclick="syncCheckboxes('checkArabic')"*/
                                  />
                                  <div className="checkbox-pair ">
                                    <span /*onclick="document.getElementById('checkArabic').click()"*/>
                                      18) Sortait d&apos;un parking , d&apos;un lieu privé , d&apos;u chemin de terre{" "}
                                    </span>
                                    <span /*onclick="document.getElementById('checkEnglish').click()"*/>
                                      يخرج من موقف عمومي في محل خصوصي في طريق غير معبدة
                                    </span>
                                  </div>
                                </div>
                                <div className="bilingual-checkbox p-2">
                                  <input
                                    className="m-2"
                                    type="checkbox"
                                    id="checkArabic19"
                                  /*  onclick="syncCheckboxes('checkArabic')"*/
                                  />
                                  <div className="checkbox-pair ">
                                    <span /*onclick="document.getElementById('checkArabic').click()"*/>
                                      19) Empiétait sur la partie de la chaussée réservée à la circulation
                                      en sens inverse
                                    </span>
                                    <span /*onclick="document.getElementById('checkEnglish').click()"*/>
                                      ينتهج جزء الطريق المخصص للإتجاه المعاكس في السير
                                    </span>
                                  </div>
                                </div>
                                <div className="bilingual-checkbox p-2">
                                  <input
                                    className="m-2"
                                    type="checkbox"
                                    id="checkArabic20"
                                  /* onclick="syncCheckboxes('checkArabic')"*/
                                  />
                                  <div className="checkbox-pair ">
                                    <span /*onclick="document.getElementById('checkArabic').click()"*/>
                                      20) Roulait en sens interdit{" "}
                                    </span>
                                    <span /*onclick="document.getElementById('checkEnglish').click()"*/>
                                      يسير في إتجاه ممنوع
                                    </span>
                                  </div>
                                </div>
                                <div className="bilingual-checkbox p-2">
                                  <input
                                    className="m-2"
                                    type="checkbox"
                                    id="checkArabic21"
                                  /* onclick="syncCheckboxes('checkArabic')"*/
                                  />
                                  <div className="checkbox-pair ">
                                    <span /*onclick="document.getElementById('checkArabic').click()"*/>
                                      21) Inobservation d&apos;un signe de priorité{" "}
                                    </span>
                                    <span /*onclick="document.getElementById('checkEnglish').click()"*/>
                                      لم يحترم علامة الأسبقية
                                    </span>
                                  </div>
                                </div>
                                <div className="bilingual-checkbox p-2">
                                  <input
                                    className="m-2"
                                    type="checkbox"
                                    id="checkArabic22"
                                  /* onclick="syncCheckboxes('checkArabic')"*/
                                  />
                                  <div className="checkbox-pair ">
                                    <span /*onclick="document.getElementById('checkArabic').click()"*/>
                                      22) Faisait un demi-tour{" "}
                                    </span>
                                    <p />
                                    <span /*onclick="document.getElementById('checkEnglish').click()"*/>
                                      يقوم بنصف دورة
                                    </span>
                                  </div>
                                </div>
                                <div className="bilingual-checkbox p-2">
                                  <input
                                    className="m-2"
                                    type="checkbox"
                                    id="checkArabic23"
                                  /* onclick="syncCheckboxes('checkArabic')"*/
                                  />
                                  <div className="checkbox-pair ">
                                    <span /*onclick="document.getElementById('checkArabic').click()"*/>
                                      23) Ouvrait une portière{" "}
                                    </span>
                                    <p />
                                    <span /*onclick="document.getElementById('checkEnglish').click()"*/>
                                      يفتح باب سيارته
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4 ">
                              <div className="card">
                                <div className="card-header" style={{ backgroundColor: "#3d3d3d2d" }}>
                                  <h3>Véhicule B /السيارة ب</h3>
                                </div>
                                <div className="card-body" style={{ backgroundColor: "#3d3d3d10" }}>
                                  <form>
                                    <div className="form-group">
                                      <label htmlFor="vehicle-choice" style={{ fontWeight: "bold" }}>
                                        Type de véhicule / نوع السيارة
                                      </label>

                                      <CustomSelect options={options2} onSelect={handleCarTypeChange2} id="carSelect2" />

                                    </div>
                                    <div className="form-group">
                                      <label htmlFor="vehicle-brand" style={{ fontWeight: "bold" }}>
                                        Marque / الصنف
                                      </label>
                                      <select 
                                        id="vehicleBrand2"
                                        className="form-control"
                                        name="vehicleBrand2" // This should match the key in your formData
                                        value={formData.vehicleBrand2}
                                        onChange={handleChange}
                                      >
                                        <option value=""></option>
                                        <option value="Renault">Renault / رينو</option>
                                        <option value="Peugeot">Peugeot / بيجو</option>
                                        <option value="Citroën">Citroën / سيتروين</option>
                                        <option value="Dacia">Dacia / داسيا</option>
                                        <option value="Volkswagen">Volkswagen / فولكس فاجن</option>
                                        <option value="Hyundai">Hyundai / هيونداي</option>
                                        <option value="Kia">Kia / كيا</option>
                                        <option value="Toyota">Toyota / تويوتا</option>
                                        <option value="Nissan">Nissan / نيسان</option>
                                        <option value="Ford">Ford / فورد</option>
                                        <option value="Chevrolet">Chevrolet / شيفروليه</option>
                                        <option value="Fiat">Fiat / فيات</option>
                                        <option value="Suzuki">Suzuki / سوزوكي</option>
                                        <option value="Mitsubishi">Mitsubishi / ميتسوبيشي</option>
                                        <option value="Mazda">Mazda / مازدا</option>
                                        <option value="Honda">Honda / هوندا</option>
                                        <option value="Mercedes-Benz">Mercedes-Benz / مرسيدس بنز</option>
                                        <option value="BMW">BMW / بي إم دبليو</option>
                                        <option value="Audi">Audi / أودي</option>
                                        <option value="Skoda">Skoda / سكودا</option>
                                        <option value="Chery">Chery / شيري</option>
                                        <option value="Geely">Geely / جيلي</option>
                                        <option value="Jeep">Jeep / جييب</option>
                                        <option value="Volvo">Volvo / فولفو</option>
                                        <option value="Jaguar">Jaguar / جاكوار</option>
                                        <option value="LandRover">LandRover / لاند روفر</option>
                                        <option value="Maserati">Maserati / مازيراتي</option>
                                        <option value="Hummer">Hummer / هامر</option>
                                        <option value="GMC">GMC / جي إم سي</option>
                                        <option value="Dodge">Dodge / دودج</option>
                                        <option value="Porsche">Porsche / بورش</option>
                                        <option value="Seat">Seat / سيات</option>
                                        <option value="DFSK">DFSK / دي اف اس كا</option>
                                        <option value="Alfa Romeo">Alfa Romeo / ألفا روميو</option>
                                        <option value="Aston Martin">Aston Martin / أستون مارتن</option>
                                        <option value="Baic">Baic / بايك</option>
                                        <option value="Brilliance">Brilliance / بريلينس</option>
                                        <option value="Bugatti">Bugatti / بوغاتي</option>
                                        <option value="BYD">BYD / بي واي دي</option>
                                        <option value="Cadillac">Cadillac / كاديلاك</option>
                                        <option value="Chana">Chana / شانا</option>
                                        <option value="Changan">Changan / شانجان</option>
                                        <option value="Chrysler">Chrysler / كرايسلر</option>
                                        <option value="Corvette">Corvette / كورفيت</option>
                                        <option value="Daewoo">Daewoo / دايو</option>
                                        <option value="DFM">DFM / دي اف ام</option>
                                        <option value="Daihatsu">Daihatsu / دايهاتسو</option>
                                        <option value="DS">DS / دي اس</option>
                                        <option value="Zotye">Zotye / زوتي</option>
                                        <option value="Faw">Faw / فاو</option>
                                        <option value="FOTON">FOTON / فوتون</option>
                                        <option value="Gonow">Gonow / غونوف</option>
                                        <option value="Great Wall">Great Wall / جريت وول</option>
                                        <option value="Hafei motors">Hafei motors / هافي موتورز</option>
                                        <option value="JMC">JMC / جي ام سي</option>
                                        <option value="Haima">Haima / هايماء</option>
                                        <option value="Infiniti">Infiniti / إنفينيتي</option>
                                        <option value="Iran Khodro">Iran Khodro / إيران خودرو</option>
                                        <option value="Lada">Lada / لادا</option>
                                        <option value="Lancia">Lancia / لانشيا</option>
                                        <option value="Tata">Tata / تاتا</option>
                                        <option value="SsangYong">SsangYong / سانغ يونغ</option>
                                        <option value="Sokon">Sokon / سوكون</option>
                                        <option value="Saipa">Saipa / سايبا</option>
                                        <option value="Smart">Smart / سمارت</option>
                                        <option value="Saab">Saab / ساب</option>
                                        <option value="Mini">Mini / ميني</option>
                                        <option value="MG">MG / إم جي</option>
                                        <option value="McLaren">McLaren / مكلارين</option>
                                      </select>
                                    </div>
                                    <div className="form-group">
                                      <label htmlFor="car-number" style={{ fontWeight: "bold" }}>
                                        N° D&apos;immatricule Véhicule /السيارة ترقيم{" "}
                                      </label>
                                      <input
                                        type="text"
                                        id="carNumber2"
                                        name="carNumber2"
                                        value={formData.carNumber2}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="eg: 1001115-112-25"
                                        maxLength={14}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label htmlFor="coming-from" style={{ fontWeight: "bold" }}>
                                        Venant de / قادم من
                                      </label>
                                      <input
                                        type="text"
                                        id="comingfrom2"
                                        name="comingfrom2"
                                        className="form-control"
                                        value={formData.comingfrom2}
                                        onChange={handleChange}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label htmlFor="going-to" style={{ fontWeight: "bold" }}>
                                        Allant vers / المتجه إلى
                                      </label>
                                      <input
                                        type="text"
                                        id="goingto2"
                                        name="goingto2"
                                        className="form-control"
                                        value={formData.goingto2}
                                        onChange={handleChange}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <h5>
                                        Assuré (voir attestation d&apos;assurance)
                                        <br /> مؤمن (انظر إلى شهادة التأمين:
                                      </h5>
                                      <div className="row">
                                        <div className="col">
                                          <label htmlFor="assure-name" style={{ fontWeight: "bold" }}>
                                            Nom: اللقب
                                          </label>
                                          <input
                                            type="text"
                                            id="assurename2"
                                            name="assurename2"
                                            className="form-control"
                                            value={formData.assurename2}
                                            onChange={handleChange}
                                          />
                                        </div>
                                        <div className="col">
                                          <label
                                            htmlFor="assure-firstname"
                                            style={{ fontWeight: "bold" }}
                                          >
                                            Prénom: الإسم
                                          </label>
                                          <input
                                            type="text"
                                            id="assurefirstname2"
                                            name="assurefirstname2"
                                            className="form-control"
                                            value={formData.assurefirstname2}
                                            onChange={handleChange}
                                          />
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="driver-address" style={{ fontWeight: "bold" }}>
                                          Adresse: العنوان
                                        </label>
                                        <input
                                          type="text"
                                          id="assureaddress2"
                                          name="assureaddress2"
                                          className="form-control"
                                          value={formData.assureaddress2}
                                          onChange={handleChange}
                                        />
                                        <InsuranceForm
                                          formId="form2"
                                          insuranceCompanyId="insurance-company-2"
                                          policeNumberId="police-number-2"
                                          insuranceAgencyId="insurance-agency-2"
                                          validityStartId="validity-start-2"
                                          validityEndId="validity-end-2"
                                          formData={{
                                            insuranceCompany: formData.form2_insuranceCompany,
                                            policeNumber: formData.form2_policeNumber,
                                            insuranceAgency: formData.form2_insuranceAgency,
                                            validityStart: formData.form2_validityStart,
                                            validityEnd: formData.form2_validityEnd
                                          }}
                                          setFormData={handleInputChange}
                                        />
                                      </div>

                                    </div>
                                    <div className="form-group ">
                                      <h5>
                                        Conducteur (voir permis de conduire) السائق (راجع رخصة القيادة) :
                                      </h5>
                                      <div className="row">
                                        <div className="col">
                                          <label htmlFor="driver-name" style={{ fontWeight: "bold" }}>
                                            Nom: اللقب
                                          </label>
                                          <input
                                            type="text"
                                            id="drivername2"
                                            name="drivername2"
                                            className="form-control"
                                            value={formData.drivername2}
                                            onChange={handleChange}
                                          />
                                        </div>
                                        <div className="col">
                                          <label
                                            htmlFor="driver-firstname"
                                            style={{ fontWeight: "bold" }}
                                          >
                                            Prénom: الإسم
                                          </label>
                                          <input
                                            type="text"
                                            id="driverfirstname2"
                                            name="driverfirstname2"
                                            className="form-control"
                                            value={formData.driverfirstname2}
                                            onChange={handleChange}
                                          />
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="driver-address" style={{ fontWeight: "bold" }}>
                                          Adresse: العنوان
                                        </label>
                                        <input
                                          type="text"
                                          id="driveraddress2"
                                          name="driveraddress2"
                                          className="form-control"
                                          value={formData.driveraddress2}
                                          onChange={handleChange}
                                        />
                                      </div>
                                      <div className="row">
                                        <div className="col">
                                          <label htmlFor="driver-license" style={{ fontWeight: "bold" }}>
                                            Permis de conduire N°: رقم رخصة القيادة
                                          </label>
                                          <input
                                            type="text"
                                            id="driverlicense2"
                                            name="driverlicense2"
                                            className="form-control"
                                            value={formData.driverlicense2}
                                            onChange={handleChange}
                                          />
                                        </div>
                                        <div className="col">
                                          <label
                                            htmlFor="license-issue-date"
                                            style={{ fontWeight: "bold" }}
                                          >
                                            Délivre le:<br/> صرح  في
                                          </label>
                                          <input
                                            type="date"
                                            id="licenseIssueDate2"
                                            name="licenseIssueDate2"
                                            className="form-control"
                                            value={formData.licenseIssueDate2}
                                            onChange={handleChange}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="form-group p-1">
                                      <label htmlFor="wilaya-choice" style={{ fontWeight: "bold" }}>
                                        Par la wilaya: من الولاية
                                      </label>
                                      <select  
                                        id="wilayaChoice2"
                                        className="form-control"
                                        value={formData.wilayaChoice2}
                                        onChange={handleChange}
                                        data-required=""
                                        name="wilayaChoice2" // This should match the key in your formData

                                      >
                                        <option value="">Select Wialaya / اختر الولاية</option>
                                        <option value="Adrar">Adrar / أدرار</option>
                                        <option value="Chlef">Chlef / الشلف</option>
                                        <option value="Laghouat">Laghouat / الأغواط</option>
                                        <option value="Oum El Bouaghi">
                                          Oum El Bouaghi / أم البواقي
                                        </option>
                                        <option value="Batna">Batna / باتنة</option>
                                        <option value="Béjaïa">Béjaïa / بجاية</option>
                                        <option value="Biskra">Biskra / بسكرة</option>
                                        <option value="Béchar">Béchar / بشار</option>
                                        <option value="Blida">Blida / البليدة</option>
                                        <option value="Bouira">Bouira / البويرة</option>
                                        <option value="Tamanrasset">Tamanrasset / تمنراست</option>
                                        <option value="Tébessa">Tébessa / تبسة</option>
                                        <option value="Tlemcen">Tlemcen / تلمسان</option>
                                        <option value="Tiaret">Tiaret / تيارت</option>
                                        <option value="Tizi Ouzou">Tizi Ouzou / تيزي وزو</option>
                                        <option value="Alger">Alger / الجزائر</option>
                                        <option value="Djelfa">Djelfa / الجلفة</option>
                                        <option value="Jijel">Jijel / جيجل</option>
                                        <option value="Sétif">Sétif / سطيف</option>
                                        <option value="Saïda">Saïda / سعيدة</option>
                                        <option value="Skikda">Skikda / سكيكدة</option>
                                        <option value="Sidi Bel Abbès">
                                          Sidi Bel Abbès / سيدي بلعباس
                                        </option>
                                        <option value="Annaba">Annaba / عنابة</option>
                                        <option value="Guelma">Guelma / قالمة</option>
                                        <option value="Constantine">Constantine / قسنطينة</option>
                                        <option value="Médéa">Médéa / المدية</option>
                                        <option value="Mostaganem">Mostaganem / مستغانم</option>
                                        <option value="M&apos;Sila">M&apos;Sila / المسيلة</option>
                                        <option value="Mascara">Mascara / معسكر</option>
                                        <option value="Ouargla">Ouargla / ورقلة</option>
                                        <option value="Oran">Oran / وهران</option>
                                        <option value="3El Bayadh2">El Bayadh / البيض</option>
                                        <option value="Illizi">Illizi / إليزي</option>
                                        <option value="Bordj Bou Arréridj">
                                          Bordj Bou Arréridj / برج بوعريريج
                                        </option>
                                        <option value="Boumerdès">Boumerdès / بومرداس</option>
                                        <option value="El Tarf">El Tarf / الطارف</option>
                                        <option value="Tindouf">Tindouf / تندوف</option>
                                        <option value="Tissemsilt">Tissemsilt / تيسمسيلت</option>
                                        <option value="El Oued">El Oued / الوادي</option>
                                        <option value="Khenchela">Khenchela / خنشلة</option>
                                        <option value="Souk Ahras">Souk Ahras / سوق أهراس</option>
                                        <option value="Tipaza">Tipaza / تيبازة</option>
                                        <option value="Mila">Mila / ميلة</option>
                                        <option value="Aïn Defla">Aïn Defla / عين الدفلى</option>
                                        <option value="Naâma">Naâma / النعامة</option>
                                        <option value="Aïn Témouchent">
                                          Aïn Témouchent / عين تموشنت
                                        </option>
                                        <option value="Ghardaïa">Ghardaïa / غرداية</option>
                                        <option value="Relizane">Relizane / غليزان</option>
                                        <option value="Timimoun">Timimoun / تيميمون</option>
                                        <option value="Bordj Badji Mokhtar">
                                          Bordj Badji Mokhtar / برج باجي مختار
                                        </option>
                                        <option value="Ouled Djellal">Ouled Djellal / أولاد جلال</option>
                                        <option value="Béni Abbès">Béni Abbès / بني عباس</option>
                                        <option value="In Salah">In Salah / عين صالح</option>
                                        <option value="In Guezzam54">Ain Guezzam / عين قزام</option>
                                        <option value="Touggourt">Touggourt / تقرت</option>
                                        <option value="Djanet">Djanet / جانت</option>
                                        <option value="El M&apos;Ghair">El M&apos;Ghair / المغير</option>
                                        <option value="El Menia">El Menia / المنيعة</option>
                                      </select>
                                    </div>
                                    <div className="form-group p-1">
                                      <label htmlFor="category-choice" style={{ fontWeight: "bold" }}>
                                        Catégorie: الفئة
                                      </label>
                                      <select
                                        id="categoryChoice2"
                                        className="form-control"
                                        value={formData.categoryChoice2}
                                        onChange={handleChange}
                                        data-required=""
                                        name="categoryChoice2" // This should match the key in your formData

                                      >
                                        <option value="">
                                          Select Categorie اختر الفئة
                                        </option>
                                        <option value="A1">A1</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                        <option value="E">E</option>
                                        <option value="F">F</option>
                                      </select>
                                    </div>
                                    <div
                                      className="scroll-container"
                                      style={{ overflowX: "auto" }}
                                    >
                                      <div className="col">
                                        <label
                                          htmlFor="Degats-apprentsA"
                                          style={{ fontWeight: "bold" }}
                                        >
                                          Dégats apparents véhicule B : أضرار واضحة في
                                          المركبة{" "}
                                        </label>

                                      </div>
                                      <ImageDisplay
  type={selectedCarType2}
  onChecklistPointSelect={(point: React.SetStateAction<null>, checkedItems: React.SetStateAction<{}>) => {
    setSelectedChecklistPoint2(point);
    setCheckedItems2(checkedItems);
  }}
  onChecklistChange={handleChecklistChange2} // Ensure this is passed correctly
/>  </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className={`p-3 ${cairo.className}`}>
        <div className="row">
        <div className="pcoded-main-container">
          <div className="pcoded-wrapper">
            <div className="pcoded-content">
              {/* Page-header end */}
              <div className="pcoded-inner-content">
                {/* Main-body start */}
                <div className="main-body">
                  <div className="page-wrapper">
                    {/* Page body start */}
                    <div className="page-body">
                      <div className="page-body">
                        <div className="row">
                          <div className="col-lg-12 ">
                            <div className="card">
                              <div className="card-header">
                                <h6>
                                  <span style={{ fontSize: "large" }}>
                                    Déclaration :
                                  </span>{" "}
                                  À remplir par l&apos;assuré et à transmettre dans les
                                  sept jours à son assureur. (dans les troix jours
                                  en cas de vol du véhicule)/{" "}
                                  <span style={{ fontSize: "large" }}>
                                    :التصريح
                                  </span>{" "}
                                  يملأ هذا التصريح من طرف المؤمن له و يرسل في ظرف 7
                                  أيام إلى المؤمن في 3 أيام في حالة سرقة السيارة
                                </h6>
                              </div>
                              <div className="card-block">
                                <div className="form-group form-default">
                                  <label
                                    htmlFor="nom-assure"
                                    style={{ display: "block" }}
                                  >
                                    Nom de l&apos;assuré: /: إسم المؤمن له
                                  </label>
                                  <input
                                    type="text"
                                    name="nomAssure"
                                    id="nom-assure"
                                    className="form-control"
                                    value={formData.nomAssure}
                                    onChange={handleChange}
                                  />
                                  <span className="form-bar" />
                                </div>
                                <div className="form-group form-default row">
                                  <div className="col-form-label col-sm-6">
                                    <label
                                      htmlFor="assure-profession"
                                      style={{ display: "block" }}
                                    >
                                      Profession: /: المهنة
                                    </label>
                                    <input
                                      id="assure-profession"
                                      type="text"
                                      name="assureProfession"
                                      className="form-control"
                                      value={formData.assureProfession}
                                      onChange={handleChange}
                                    />
                                    <span className="form-bar" />
                                  </div>
                                  <div className="col-form-label col-sm-6">
                                    <label
                                      htmlFor="assure-num"
                                      style={{ display: "block" }}
                                    >
                                      Tél: /: رقم الهاتف
                                    </label>
                                    <input
                                      id="assure-num"
                                      type="text"
                                      name="assureNum"
                                      className="form-control"
                                      value={formData.assureNum}
                                      onChange={handleChange}
                                    />
                                    <span className="form-bar" />
                                  </div>
                                  <div className="container">
                                    <div className="row">
                                      <div className="col-12">
                                        <h4 className="p-3 text-center">
                                          Choisir votre cas : إختر حالتك
                                        </h4>
                                      </div>
                                    </div>
                                    <AccidentCircumstances onInputChangee={handleInputChangee} onSelectionComplete={handleSelectionComplete} />                                  </div>
                                  {/* Add more inputs as needed */}
                                </div>
                              </div>
                            </div>
                            <div className=" col-md-12">
                              <h4> A-til été établi : / حل حرر </h4>
                              <label htmlFor="gendarmerie-choice">
                                Un procés-verbal de gendarmerie ? : / محظر
                                من طرف الدرك الوطني
                              </label>
                              <div>
                                <select
                                  id="gendarmerie-choice"
                                  name="gendarmerieChoice"
                                  className="form-control"
                                  value={formData.gendarmerieChoice}
                                  onChange={handleChange}
                                >
                                  <option value="Oui">Oui / نعم</option>
                                  <option value="non">non / لا</option>
                                </select>
                              </div>
                              <label htmlFor="wilaya-choice">
                                Un rapport de police ? : / تقرير من طرف
                                الشرطة
                              </label>
                              <div>
                                <select
                                  name="policeChoice"
                                  className="form-control"
                                  id="police-choice"
                                  value={formData.policeChoice}
                                  onChange={handleChange}
                                >
                                  <option value="Oui">Oui / نعم</option>
                                  <option value="non">non / لا</option>
                                </select>
                              </div>
                              <div>
                              <label htmlFor="brigade-choice">
                                Si oui : / حل حرر Brigade ou commissariat de
                                / فرع أو محافظة الشرطة المختصة
                              </label>
                              <div>
                                <select
                                  name="wilayaChoice"
                                  className="form-control"
                                  id="wilaya-choice"
                                  value={formData.wilayaChoice}
                                  onChange={handleChange}
                                /* onChange={updateDairaList}*/
                                >
                                  <option value="">
                                    Select Wialaya / اختر الولاية
                                  </option>
                                  <option value={1}>Adrar / أدرار</option>
                                  <option value={2}>Chlef / الشلف</option>
                                  <option value={3}>
                                    Laghouat / الأغواط
                                  </option>
                                  <option value={4}>
                                    Oum El Bouaghi / أم البواقي
                                  </option>
                                  <option value={5}>Batna / باتنة</option>
                                  <option value={6}>Béjaïa / بجاية</option>
                                  <option value={7}>Biskra / بسكرة</option>
                                  <option value={8}>Béchar / بشار</option>
                                  <option value={9}>Blida / البليدة</option>
                                  <option value={10}>
                                    Bouira / البويرة
                                  </option>
                                  <option value={11}>
                                    Tamanrasset / تمنراست
                                  </option>
                                  <option value={12}>Tébessa / تبسة</option>
                                  <option value={13}>
                                    Tlemcen / تلمسان
                                  </option>
                                  <option value={14}>Tiaret / تيارت</option>
                                  <option value={15}>
                                    Tizi Ouzou / تيزي وزو
                                  </option>
                                  <option value={16}>
                                    Alger / الجزائر
                                  </option>
                                  <option value={17}>
                                    Djelfa / الجلفة
                                  </option>
                                  <option value={18}>Jijel / جيجل</option>
                                  <option value={19}>Sétif / سطيف</option>
                                  <option value={20}>Saïda / سعيدة</option>
                                  <option value={21}>
                                    Skikda / سكيكدة
                                  </option>
                                  <option value={22}>
                                    Sidi Bel Abbès / سيدي بلعباس
                                  </option>
                                  <option value={23}>Annaba / عنابة</option>
                                  <option value={24}>Guelma / قالمة</option>
                                  <option value={25}>
                                    Constantine / قسنطينة
                                  </option>
                                  <option value={26}>Médéa / المدية</option>
                                  <option value={27}>
                                    Mostaganem / مستغانم
                                  </option>
                                  <option value={28}>
                                    M&apos;Sila / المسيلة
                                  </option>
                                  <option value={29}>
                                    Mascara / معسكر
                                  </option>
                                  <option value={30}>
                                    Ouargla / ورقلة
                                  </option>
                                  <option value={31}>Oran / وهران</option>
                                  <option value={32}>
                                    El Bayadh / البيض
                                  </option>
                                  <option value={33}>Illizi / إليزي</option>
                                  <option value={34}>
                                    Bordj Bou Arréridj / برج بوعريريج
                                  </option>
                                  <option value={35}>
                                    Boumerdès / بومرداس
                                  </option>
                                  <option value={36}>
                                    El Tarf / الطارف
                                  </option>
                                  <option value={37}>
                                    Tindouf / تندوف
                                  </option>
                                  <option value={38}>
                                    Tissemsilt / تيسمسيلت
                                  </option>
                                  <option value={39}>
                                    El Oued / الوادي
                                  </option>
                                  <option value={40}>
                                    Khenchela / خنشلة
                                  </option>
                                  <option value={41}>
                                    Souk Ahras / سوق أهراس
                                  </option>
                                  <option value={42}>
                                    Tipaza / تيبازة
                                  </option>
                                  <option value={43}>Mila / ميلة</option>
                                  <option value={44}>
                                    Aïn Defla / عين الدفلى
                                  </option>
                                  <option value={45}>
                                    Naâma / النعامة
                                  </option>
                                  <option value={46}>
                                    Aïn Témouchent / عين تموشنت
                                  </option>
                                  <option value={47}>
                                    Ghardaïa / غرداية
                                  </option>
                                  <option value={48}>
                                    Relizane / غليزان
                                  </option>
                                  <option value={49}>
                                    Timimoun / تيميمون
                                  </option>
                                  <option value={50}>
                                    Bordj Badji Mokhtar / برج باجي مختار
                                  </option>
                                  <option value={51}>
                                    Ouled Djellal / أولاد جلال
                                  </option>
                                  <option value={52}>
                                    Béni Abbès / بني عباس
                                  </option>
                                  <option value={53}>
                                    In Salah / عين صالح
                                  </option>
                                  <option value={54}>
                                    In Guezzam / عين قزام
                                  </option>
                                  <option value={55}>
                                    Touggourt / تقرت
                                  </option>
                                  <option value={56}>Djanet / جانت</option>
                                  <option value={57}>
                                    El M&apos;Ghair / المغير
                                  </option>
                                  <option value={58}>
                                    El Menia / المنيعة
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                          
                          </div>
                          <div className="col-lg-12 p-2">
                            <label htmlFor="conducteur-choice">
                              Conducteur du véhicule assuré est-il le
                              conducteur habituel du véhicule ? : / : هل هو
                              السائق الإعتيادي لها ؟
                            </label>
                            <div>
                              <select
                                name="conducteurChoice"
                                className="form-control"
                                id="conducteur-choice"
                                value={formData.conducteurChoice}
                                onChange={handleChange}
                              /*  onChange={updateDairaList}*/
                              >
                                <option value={1}>Oui / نعم</option>
                                <option value={2}>non / لا</option>
                              </select>
                            </div>
                            <label htmlFor="conducteur-choice-2">
                              Réside-t-il habituellement chez l&apos;assuré ? : /
                              هل يسكن إعتياديا عند المؤمن له ؟ الشرطة
                            </label>
                            <div>
                              <select
                                name="conducteurChoice2"
                                className="form-control"
                                id="conducteur-choice-2"
                                value={formData.conducteurChoice2}
                                onChange={handleChange}
                              /*   onChange={updateDairaList}*/
                              >
                                <option value={1}>Oui / نعم</option>
                                <option value={2}>non / لا</option>
                              </select>
                            </div>
                            <div className="form-group form-default">
                              <label
                                htmlFor="dob_conducteur"
                                style={{ display: "block" }}
                              >
                                Date de naissance : / تاريخ الإزدياد
                              </label>
                              <input
                                id="dobConducteur"
                                type="date"
                                name="dobConducteur"
                                className="form-control"
                                value={formData.dobConducteur}
                                onChange={handleChange}
                              />
                              <span className="form-bar" />
                            </div>

                            <div
                              style={{
                                direction: "rtl",
                                textAlign: "right",
                                padding: 20
                              }}
                              className="col-sm-12"
                            >
                              <h5>الموافقة على معالجة البيانات الشخصية</h5>
                              <div>
                                أوافق على أنني قد قمت بإدخال معلوماتي
                                الشخصية وأعلم أن هذه المعلومات سيتم معالجتها
                                واستخدامها وفقاً للقانون رقم 18-07 المتعلق
                                بحماية الأشخاص الطبيعيين في معالجة البيانات
                                ذات الطابع الشخصي في الجزائر. أفهم أن لي
                                الحق في الوصول إلى بياناتي وتصحيحها وحذفها
                                عند الطلب، وأعلم أنني يمكنني سحب موافقتي في
                                أي وقت. أتعهد بأنني قد قرأت وفهمت هذه
                                القواعد وأوافق على الالتزام بها.
                              </div>
                              <div
                                style={{ marginTop: 20 }}
                                className="checkbox-container"
                              >
                                <input
                                  type="checkbox"
                                  id="agree"
                                  name="agree"
                                  data-required=""
                                  value={formData.agree}
                                  onChange={handleChange}
                                />
                                <label htmlFor="agree">أوافق</label>
                              </div>
                            </div>
                            <div className="col-form-label col-sm-12">
                              <label
                                htmlFor="nature"
                                style={{ display: "block" }}
                              >
                                Le: ( la date )
                              </label>
                              <input
                                data-required=""
                                type="date"
                                name="datepdf"
                                className="form-control"
                                id="date-pdf"
                                value={formData.datepdf}
                                onChange={handleChange}
                              />
                              <span className="form-bar" />
                              <label
                                htmlFor="owner-name"
                                style={{ display: "block" }}
                              >
                                à (le lieu)
                              </label>
                              <input
                                data-required=""
                                type="text"
                                name="lieupdf"
                                id="lieu-pdf"
                                className="form-control"
                                value={formData.lieupdf}
                                onChange={handleChange}
                              />
                              <span className="form-bar" />
                            </div>
                            <div
                              style={{
                                direction: "rtl",
                                textAlign: "right",
                                padding: 20,
                                color: "red"
                              }}
                              className="col-sm-12"
                            >
                              {" "}
                              بعد النقر على الزر، سيتم توجيهك إلى بوابة
                              الدفع. بمجرد إتمام عملية الدفع، ستتمكن من
                              الوصول إلى الوثيقة الخاصة بك تلقائيًا. ستتاح
                              لك مدة محددة لتعديل الوثيقة حسب الحاجة.
                            </div>
                            <div className="col-lg-12">
                              {" "}
                              <button type="submit" className="pay-now-btn" onClick={handlePay}>Paiement / الدفع</button>
                              {isLoading && <LoadingOverlay />}

                       

                    <PDFComponent
                      inputValuee={inputValuee}
                      selectedChecklist={selectedChecklist}
                      inputValuee2={inputValuee2}
                      selectedChecklist2={selectedChecklist2}
                      caseId={caseId}
                      circumstance={circumstance}
                      base64Image={base64Image}
                      optionId={optionId}
                      formData={formData}
                      selectedId1={selectedChecklistPoint1}
                      selectedId2={selectedChecklistPoint2}
                      checkedItems1={checkedItems1}
                      checkedItems2={checkedItems2}
                      inputValue={inputText}
                    />
                 
                            </div>
                            <iframe
                              id="pdf-frame"
                              width={1000}
                              height={1000}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer/>
           
          </div>
        </div>
      </div></div>



      <Script src="assets/js/jquery-2.1.0.min.js"></Script>
      <Script src="assets/js/popper.js"></Script>
      <Script src="assets/js/bootstrap.min.js"></Script>
      <Script src="assets/js/owl-carousel.js"></Script>
      <Script src="assets/js/scrollreveal.min.js"></Script>
      <Script src="assets/js/waypoints.min.js"></Script>
      <Script src="assets/js/jquery.counterup.min.js"></Script>
      <Script src="assets/js/imgfix.min.js"></Script>
      <Script src="assets/js/slick.js"></Script>
      <Script src="assets/js/lightbox.js"></Script>
      <Script src="assets/js/isotope.js"></Script>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></Script>
      <Script src="https://kit.fontawesome.com/a076d05399.js"></Script>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.3.1/jspdf.plugin.standard_fonts_metrics.min.js"></Script>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.3.1/jspdf.plugin.split_text_to_size.min.js"></Script>
      <Script
        src="https://cdn.jsdelivr.net/npm/arabicjs@1.0.6/dist/arabic.min.js"></Script>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.plugin.standard_fonts_metrics.js"></Script>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.plugin.split_text_to_size.js"></Script>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.plugin.standard_fonts_helvetica.js"></Script>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.3.1/jspdf.plugin.from_html.min.js"></Script>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></Script>
      <Script
        src="https://cdn.jsdelivr.net/npm/pusher-js@7.0.3/dist/pusher.min.js"></Script>

      <Script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></Script>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></Script>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></Script>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></Script>
      <Script src="assets/js/custom.js"></Script>
      <Script src="Script.js"></Script>
      <Script src="test.js"></Script>
      <Script src="car_seklection-b.js"></Script>
    </>

  );
}

