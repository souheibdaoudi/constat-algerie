import React from 'react';
import PropTypes from 'prop-types';
import styles from '../components/style.css';

const CarSelectionComponent = ({ selectedCarType }) => {
  let imagePath = '';
  let circlePointsHTML = '';

  switch (selectedCarType) {
    case 'car1':
      imagePath = 'assets/images/car.png';
      circlePointsHTML = (
        <>
          <div className={styles.circleContainerImg}>
            <div className={styles.circleImg} onClick={(e) => showChecklistA(e, 'checklist1')} style={{ top: '10px', left: '10px' }}></div>
          </div>
          <div className={styles.circleContainerImg}>
            <div className={styles.circleImg} onClick={(e) => showChecklistA(e, 'checklist1')} style={{ top: '10px', left: '10px' }}></div>
          </div>
          <div className={styles.circleContainerImg2}>
            <div className={styles.circleImg} onClick={(e) => showChecklistA(e, 'checklist2')} style={{ top: '10px', left: '10px' }}></div>
          </div>
          <div className={styles.circleContainerImg3}>
            <div className={styles.circleImg} onClick={(e) => showChecklistA(e, 'checklist3')} style={{ top: '10px', left: '10px' }}></div>
          </div>
          <div className={styles.circleContainerImg4}>
            <div className={styles.circleImg} onClick={(e) => showChecklistA(e, 'checklist4')} style={{ top: '10px', left: '10px' }}></div>
          </div>
          <div className={styles.circleContainerImg5}>
            <div className={styles.circleImg} onClick={(e) => showChecklistA(e, 'checklist5')} style={{ top: '10px', left: '10px' }}></div>
          </div>
          <div className={styles.circleContainerImg6}>
            <div className={styles.circleImg} onClick={(e) => showChecklistA(e, 'checklist6')} style={{ top: '10px', left: '10px' }}></div>
          </div>
          <div className={styles.circleContainerImg7}>
            <div className={styles.circleImg} onClick={(e) => showChecklistA(e, 'checklist7')} style={{ top: '10px', left: '10px' }}></div>
          </div>
          <div className={styles.circleContainerImg8}>
            <div className={styles.circleImg} onClick={(e) => showChecklistA(e, 'checklist8')} style={{ top: '10px', left: '10px' }}></div>
          </div>   <div className={styles.circleContainerImg9}>
            <div className={styles.circleImg} onClick={(e) => showChecklistA(e, 'checklist9')} style={{ top: '10px', left: '10px' }}></div>
          </div>   <div className={styles.circleContainerImg10}>
            <div className={styles.circleImg} onClick={(e) => showChecklistA(e, 'checklist10')} style={{ top: '10px', left: '10px' }}></div>
          </div><div className={styles.circleContainerImg11}>
            <div className={styles.circleImg} onClick={(e) => showChecklistA(e, 'checklist11')} style={{ top: '10px', left: '10px' }}></div>
          </div><div className={styles.circleContainerImg12}>
            <div className={styles.circleImg} onClick={(e) => showChecklistA(e, 'checklist12')} style={{ top: '10px', left: '10px' }}></div>
          </div>        </>
      );
      break;
    case 'car2':
      imagePath = 'assets/images/bus.png';
      circlePointsHTML = (
        <>
          <div className={styles.circleContainerImg13}>
            <div className={styles.circleImg} onClick={(e) => showChecklistA(e, 'checklist13')} style={{ top: '10px', left: '10px' }}></div>
          </div>
          <div className={styles.circleContainerImg13}>
            <div className={styles.circleImg} onClick={(e) => showChecklistA(e, 'checklist13')} style={{ top: '10px', left: '10px' }} ></div>
        </div>

          <div className={styles.circleContainerImg15}>
            <div className={styles.circleImg} onClick={(e) => showChecklistA(e, 'checklist15')} style={{ top: '10px', left: '10px' }} ></div>
                        </div >
  <div className={styles.circleContainerImg16}>
    <div className={styles.circleImg} onClick={(e) => showChecklistA(e, 'checklist16')} style={{ top: '10px', left: '10px' }} ></div>
                        </div >
  <div className={styles.circleContainerImg17}>
    <div className={styles.circleimg} onClick={(e) => showChecklistA(e, 'checklist17')} style={{ top: '10px', left: '10px' }} ></div>
                        </div >
  <div className={styles.circleContainerImg18}>
    <div className={styles.circleimg} onClick={(e) => showChecklistA(e, 'checklist18')} style={{ top: '10px', left: '10px' } }></div>
                        </div >
  <div className={styles.circleContainerImg19}>
    <div className={styles.circleimg} onClick={(e) => showChecklistA(e, 'checklist19')} style={{ top: '10px', left: '10px' }} ></div>
                        </div >
  <div className={styles.circleContainerImg20}>
    <div className={styles.circleimg} onClick={(e) => showChecklistA(e, 'checklist20')} style={{ top: '10px', left: '10px' } }></div>
                        </div >
  <div className={styles.circleContainerImg21}>
    <div className={styles.circleimg} onClick={(e) => showChecklistA(e, 'checklist21')} style={{ top: '10px', left: '10px' } }></div>
                        </div >

  <div className={styles.circleContainerImg24}>
    <div className={styles.circleimg} onClick={(e) => showChecklistA(e, 'checklist24')} style={{ top: '10px', left: '10px' }} ></div>
                        </div >
  <div className={styles.circleContainerImg25}>
    <div className={styles.circleimg} onClick={(e) => showChecklistA(e, 'checklist25')} style={{ top: '10px', left: '10px' }} ></div>
                        </div >        </>
      );
break;
case 'car3':
imagePath = 'assets/images/bus.png';
circlePointsHTML = (
  <>
    <div className={styles.circleContainerImg13}>
      <div className={styles.circleImg} onClick={(e) => showChecklistA(e, 'checklist13')} style={{ top: '10px', left: '10px' }}></div>
    </div>
    <div className={styles.circleContainerImg13}>
      <div className={styles.circleImg} onClick={(e) => showChecklistA(e, 'checklist13')} style={{ top: '10px', left: '10px' }} ></div>
  </div>

    <div className={styles.circleContainerImg15}>
      <div className={styles.circleImg} onClick={(e) => showChecklistA(e, 'checklist15')} style={{ top: '10px', left: '10px' }} ></div>
                  </div >
<div className={styles.circleContainerImg16}>
<div className={styles.circleImg} onClick={(e) => showChecklistA(e, 'checklist16')} style={{ top: '10px', left: '10px' }} ></div>
                  </div >
<div className={styles.circleContainerImg17}>
<div className={styles.circleimg} onClick={(e) => showChecklistA(e, 'checklist17')} style={{ top: '10px', left: '10px' }} ></div>
                  </div >
<div className={styles.circleContainerImg18}>
<div className={styles.circleimg} onClick={(e) => showChecklistA(e, 'checklist18')} style={{ top: '10px', left: '10px' } }></div>
                  </div >
<div className={styles.circleContainerImg19}>
<div className={styles.circleimg} onClick={(e) => showChecklistA(e, 'checklist19')} style={{ top: '10px', left: '10px' }} ></div>
                  </div >
<div className={styles.circleContainerImg20}>
<div className={styles.circleimg} onClick={(e) => showChecklistA(e, 'checklist20')} style={{ top: '10px', left: '10px' } }></div>
                  </div >
<div className={styles.circleContainerImg21}>
<div className={styles.circleimg} onClick={(e) => showChecklistA(e, 'checklist21')} style={{ top: '10px', left: '10px' } }></div>
                  </div >

<div className={styles.circleContainerImg24}>
<div className={styles.circleimg} onClick={(e) => showChecklistA(e, 'checklist24')} style={{ top: '10px', left: '10px' }} ></div>
                  </div >
<div className={styles.circleContainerImg25}>
<div className={styles.circleimg} onClick={(e) => showChecklistA(e, 'checklist25')} style={{ top: '10px', left: '10px' }} ></div>
                  </div >        </>
);
break;
    case 'car4':
      imagePath = 'assets/images/bus.png';
      circlePointsHTML = (
        <>
          <div className={styles.circleContainerImg13}>
            <div className={styles.circleImg} onClick={(e) => showChecklistA(e, 'checklist13')} style={{ top: '10px', left: '10px' }}></div>
          </div>
          <div className={styles.circleContainerImg13}>
            <div className={styles.circleImg} onClick={(e) => showChecklistA(e, 'checklist13')} style={{ top: '10px', left: '10px' }} ></div>
        </div>

          <div className={styles.circleContainerImg15}>
            <div className={styles.circleImg} onClick={(e) => showChecklistA(e, 'checklist15')} style={{ top: '10px', left: '10px' }} ></div>
                        </div >
  <div className={styles.circleContainerImg16}>
    <div className={styles.circleImg} onClick={(e) => showChecklistA(e, 'checklist16')} style={{ top: '10px', left: '10px' }} ></div>
                        </div >
  <div className={styles.circleContainerImg17}>
    <div className={styles.circleimg} onClick={(e) => showChecklistA(e, 'checklist17')} style={{ top: '10px', left: '10px' }} ></div>
                        </div >
  <div className={styles.circleContainerImg18}>
    <div className={styles.circleimg} onClick={(e) => showChecklistA(e, 'checklist18')} style={{ top: '10px', left: '10px' } }></div>
                        </div >
  <div className={styles.circleContainerImg19}>
    <div className={styles.circleimg} onClick={(e) => showChecklistA(e, 'checklist19')} style={{ top: '10px', left: '10px' }} ></div>
                        </div >
  <div className={styles.circleContainerImg20}>
    <div className={styles.circleimg} onClick={(e) => showChecklistA(e, 'checklist20')} style={{ top: '10px', left: '10px' } }></div>
                        </div >
  <div className={styles.circleContainerImg21}>
    <div className={styles.circleimg} onClick={(e) => showChecklistA(e, 'checklist21')} style={{ top: '10px', left: '10px' } }></div>
                        </div >

  <div className={styles.circleContainerImg24}>
    <div className={styles.circleimg} onClick={(e) => showChecklistA(e, 'checklist24')} style={{ top: '10px', left: '10px' }} ></div>
                        </div >
  <div className={styles.circleContainerImg25}>
    <div className={styles.circleimg} onClick={(e) => showChecklistA(e, 'checklist25')} style={{ top: '10px', left: '10px' }} ></div>
                        </div >        </>
      );
break;
    default:
break;
  }

 return (
    <div className={styles.carSelectionWrapper}>
      <img src={imagePath} alt="Selected Car" className={styles.carImage} />
      {circlePointsHTML}
    </div>
  );
};

CarSelectionComponent.propTypes = {
  selectedCarType: PropTypes.string.isRequired,
};

export default CarSelectionComponent;
