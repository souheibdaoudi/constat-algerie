import React, { useState } from 'react';
import styles from  '../style.css'; // Ensure this path is correct

const ImageDisplay = ({ type, onChecklistPointSelect, onChecklistChange }) => {

  const images = {
    car1: {
      src: '/assets/images/car.png',
      text: `
          <div class="circle-container-img" >
                            <div class="circle-img" data-checklist="checklist1"  style="top: 10px; left: 10px;"></div>
                        </div>
                        <div class="circle-container-img-2">
                            <div class="circle-img" data-checklist="checklist2" style="top: 10px; left: 10px;"></div>
                        </div>
                        <div class="circle-container-img-3">
                            <div class="circle-img" data-checklist="checklist3" style="top: 10px; left: 10px;"></div>
                        </div>
                        <div class="circle-container-img-4">
                            <div class="circle-img" data-checklist="checklist4" style="top: 10px; left: 10px;"></div>
                        </div>
                           <div class="circle-container-img-5">
                            <div class="circle-img" data-checklist="checklist5" style="top: 10px; left: 10px;"></div>
                        </div>
                           <div class="circle-container-img-6">
                            <div class="circle-img" data-checklist="checklist6" style="top: 10px; left: 10px;"></div>
                        </div>
                           <div class="circle-container-img-7">
                            <div class="circle-img" data-checklist="checklist7" style="top: 10px; left: 10px;"></div>
                        </div>
                           <div class="circle-container-img-8">
                            <div class="circle-img" data-checklist="checklist8" style="top: 10px; left: 10px;"></div>
                        </div>   <div class="circle-container-img-9">
                            <div class="circle-img" data-checklist="checklist9" style="top: 10px; left: 10px;"></div>
                        </div>   <div class="circle-container-img-10">
                            <div class="circle-img" data-checklist="checklist10" style="top: 10px; left: 10px;"></div>
                        </div><div class="circle-container-img-11">
                            <div class="circle-img" data-checklist="checklist11" style="top: 10px; left: 10px;"></div>
                        </div><div class="circle-container-img-12">
                            <div class="circle-img" data-checklist="checklist12" style="top: 10px; left: 10px;"></div>
                        </div>                  
                              </div>

        `,
    },
    car2: {
      src: '/assets/images/bus.png',
      text: `
       <div class="circle-container-img-13">
                            <div class="circle-img" data-checklist="checklist13" style="top: 10px; left: 10px;"></div>
                        </div>
                  
                        <div class="circle-container-img-15">
                            <div class="circle-img" data-checklist="checklist15" style="top: 10px; left: 10px;"></div>
                        </div>
                        <div class="circle-container-img-16">
                            <div class="circle-img" data-checklist="checklist16" style="top: 10px; left: 10px;"></div>
                        </div>
                          <div class="circle-container-img-17">
                            <div class="circle-img" data-checklist="checklist17" style="top: 10px; left: 10px;"></div>
                        </div>
                          <div class="circle-container-img-18">
                            <div class="circle-img" data-checklist="checklist18" style="top: 10px; left: 10px;"></div>
                        </div>
                          <div class="circle-container-img-19">
                            <div class="circle-img" data-checklist="checklist19" style="top: 10px; left: 10px;"></div>
                        </div>
                          <div class="circle-container-img-20">
                            <div class="circle-img" data-checklist="checklist20" style="top: 10px; left: 10px;"></div>
                        </div>
                          <div class="circle-container-img-21">
                            <div class="circle-img" data-checklist="checklist21" style="top: 10px; left: 10px;"></div>
                        </div>
                         
                          <div class="circle-container-img-24">
                            <div class="circle-img" data-checklist="checklist24" style="top: 10px; left: 10px;"></div>
                        </div>
                          <div class="circle-container-img-25">
                            <div class="circle-img" data-checklist="checklist25" style="top: 10px; left: 10px;"></div>
                        </div>                       
                         </div>

      `,    },
    car3: {
      src: '/assets/images/bus.png',
      text: `
      <div class="circle-container-img-13">
                            <div class="circle-img" data-checklist="checklist13" style="top: 10px; left: 10px;"></div>
                        </div>
                  
                        <div class="circle-container-img-15">
                            <div class="circle-img" data-checklist="checklist15" style="top: 10px; left: 10px;"></div>
                        </div>
                        <div class="circle-container-img-16">
                            <div class="circle-img" data-checklist="checklist16" style="top: 10px; left: 10px;"></div>
                        </div>
                          <div class="circle-container-img-17">
                            <div class="circle-img" data-checklist="checklist17" style="top: 10px; left: 10px;"></div>
                        </div>
                          <div class="circle-container-img-18">
                            <div class="circle-img" data-checklist="checklist18" style="top: 10px; left: 10px;"></div>
                        </div>
                          <div class="circle-container-img-19">
                            <div class="circle-img" data-checklist="checklist19" style="top: 10px; left: 10px;"></div>
                        </div>
                          <div class="circle-container-img-20">
                            <div class="circle-img" data-checklist="checklist20" style="top: 10px; left: 10px;"></div>
                        </div>
                          <div class="circle-container-img-21">
                            <div class="circle-img" data-checklist="checklist21" style="top: 10px; left: 10px;"></div>
                        </div>
                         
                          <div class="circle-container-img-24">
                            <div class="circle-img" data-checklist="checklist24" style="top: 10px; left: 10px;"></div>
                        </div>
                          <div class="circle-container-img-25">
                            <div class="circle-img" data-checklist="checklist25" style="top: 10px; left: 10px;"></div>
                        </div>                       
                         </div>

      `,    },
    car4: {
      src: '/assets/images/bus.png',
      text: `
       <div class="circle-container-img-13">
                            <div class="circle-img" data-checklist="checklist13" style="top: 10px; left: 10px;"></div>
                        </div>
                  
                        <div class="circle-container-img-15">
                            <div class="circle-img" data-checklist="checklist15" style="top: 10px; left: 10px;"></div>
                        </div>
                        <div class="circle-container-img-16">
                            <div class="circle-img" data-checklist="checklist16" style="top: 10px; left: 10px;"></div>
                        </div>
                          <div class="circle-container-img-17">
                            <div class="circle-img" data-checklist="checklist17" style="top: 10px; left: 10px;"></div>
                        </div>
                          <div class="circle-container-img-18">
                            <div class="circle-img" data-checklist="checklist18" style="top: 10px; left: 10px;"></div>
                        </div>
                          <div class="circle-container-img-19">
                            <div class="circle-img" data-checklist="checklist19" style="top: 10px; left: 10px;"></div>
                        </div>
                          <div class="circle-container-img-20">
                            <div class="circle-img" data-checklist="checklist20" style="top: 10px; left: 10px;"></div>
                        </div>
                          <div class="circle-container-img-21">
                            <div class="circle-img" data-checklist="checklist21" style="top: 10px; left: 10px;"></div>
                        </div>
                         
                          <div class="circle-container-img-24">
                            <div class="circle-img" data-checklist="checklist24" style="top: 10px; left: 10px;"></div>
                        </div>
                          <div class="circle-container-img-25">
                            <div class="circle-img" data-checklist="checklist25" style="top: 10px; left: 10px;"></div>
                        </div>                    
                            </div>

      `,    },



      car11:{
        src: 'assets/images/car.png', // Update with correct path for car image 1
         text: `
                    <div class="circle-container-img">
                        <div class="circle-img" data-checklist="checklist101" style="top: 10px; left: 10px;"></div>
                    </div>
                    <div class="circle-container-img-2">
                        <div class="circle-img" data-checklist="checklist102" style="top: 10px; left: 10px;"></div>
                    </div>
                    <div class="circle-container-img-3">
                        <div class="circle-img" data-checklist="checklist31" style="top: 10px; left: 10px;"></div>
                    </div>
                    <div class="circle-container-img-4">
                        <div class="circle-img" data-checklist="checklist41" style="top: 10px; left: 10px;"></div>
                    </div>
                       <div class="circle-container-img-5">
                        <div class="circle-img" data-checklist="checklist51" style="top: 10px; left: 10px;"></div>
                    </div>
                       <div class="circle-container-img-6">
                        <div class="circle-img" data-checklist="checklist61" style="top: 10px; left: 10px;"></div>
                    </div>
                       <div class="circle-container-img-7">
                        <div class="circle-img" data-checklist="checklist71" style="top: 10px; left: 10px;"></div>
                    </div>
                       <div class="circle-container-img-8">
                        <div class="circle-img" data-checklist="checklist81" style="top: 10px; left: 10px;"></div>
                    </div>   <div class="circle-container-img-9">
                        <div class="circle-img" data-checklist="checklist91" style="top: 10px; left: 10px;"></div>
                    </div>   <div class="circle-container-img-10">
                        <div class="circle-img" data-checklist="checklist110" style="top: 10px; left: 10px;"></div>
                    </div><div class="circle-container-img-11">
                        <div class="circle-img" data-checklist="checklist111" style="top: 10px; left: 10px;"></div>
                    </div><div class="circle-container-img-12">
                        <div class="circle-img" data-checklist="checklist121" style="top: 10px; left: 10px;"></div>
                    </div>
                `,
      },
    car12 :{
    src:  'assets/images/bus.png', // Update with correct path for bus image
       text: `
                                         <div class="circle-container-img-13">
                        <div class="circle-img" data-checklist="checklist131" style="top: 10px; left: 10px;"></div>
                    </div>
              
                    <div class="circle-container-img-15">
                        <div class="circle-img" data-checklist="checklist151" style="top: 10px; left: 10px;"></div>
                    </div>
                    <div class="circle-container-img-16">
                        <div class="circle-img" data-checklist="checklist161" style="top: 10px; left: 10px;"></div>
                    </div>
                      <div class="circle-container-img-17">
                        <div class="circle-img" data-checklist="checklist171" style="top: 10px; left: 10px;"></div>
                    </div>
                      <div class="circle-container-img-18">
                        <div class="circle-img" data-checklist="checklist181" style="top: 10px; left: 10px;"></div>
                    </div>
                      <div class="circle-container-img-19">
                        <div class="circle-img" data-checklist="checklist191" style="top: 10px; left: 10px;"></div>
                    </div>
                      <div class="circle-container-img-20">
                        <div class="circle-img" data-checklist="checklist201" style="top: 10px; left: 10px;"></div>
                    </div>
                      <div class="circle-container-img-21">
                        <div class="circle-img" data-checklist="checklist211" style="top: 10px; left: 10px;"></div>
                    </div>
                     
                      <div class="circle-container-img-24">
                        <div class="circle-img" data-checklist="checklist241" style="top: 10px; left: 10px;"></div>
                    </div>
                      <div class="circle-container-img-25">
                        <div class="circle-img" data-checklist="checklist251" style="top: 10px; left: 10px;"></div>
                    </div>
                    <!-- Add more circle points as needed -->
                `,
        },    car13:{
        src:'assets/images/bus.png', // Update with correct path for bus image
        text:  `
                                                   <div class="circle-container-img-13">
                        <div class="circle-img" data-checklist="checklist131" style="top: 10px; left: 10px;"></div>
                    </div>
              
                    <div class="circle-container-img-15">
                        <div class="circle-img" data-checklist="checklist151" style="top: 10px; left: 10px;"></div>
                    </div>
                    <div class="circle-container-img-16">
                        <div class="circle-img" data-checklist="checklist161" style="top: 10px; left: 10px;"></div>
                    </div>
                      <div class="circle-container-img-17">
                        <div class="circle-img" data-checklist="checklist171" style="top: 10px; left: 10px;"></div>
                    </div>
                      <div class="circle-container-img-18">
                        <div class="circle-img" data-checklist="checklist181" style="top: 10px; left: 10px;"></div>
                    </div>
                      <div class="circle-container-img-19">
                        <div class="circle-img" data-checklist="checklist191" style="top: 10px; left: 10px;"></div>
                    </div>
                      <div class="circle-container-img-20">
                        <div class="circle-img" data-checklist="checklist201" style="top: 10px; left: 10px;"></div>
                    </div>
                      <div class="circle-container-img-21">
                        <div class="circle-img" data-checklist="checklist211" style="top: 10px; left: 10px;"></div>
                    </div>
                     
                      <div class="circle-container-img-24">
                        <div class="circle-img" data-checklist="checklist241" style="top: 10px; left: 10px;"></div>
                    </div>
                      <div class="circle-container-img-25">
                        <div class="circle-img" data-checklist="checklist251" style="top: 10px; left: 10px;"></div>
                    </div>
                    <!-- Add more circle points as needed -->
                `,
        },
    car14:{
        src : 'assets/images/bus.png', // Update with correct path for bus image
        text:  `
                                                     <div class="circle-container-img-13">
                        <div class="circle-img" data-checklist="checklist131" style="top: 10px; left: 10px;"></div>
                    </div>
              
                    <div class="circle-container-img-15">
                        <div class="circle-img" data-checklist="checklist151" style="top: 10px; left: 10px;"></div>
                    </div>
                    <div class="circle-container-img-16">
                        <div class="circle-img" data-checklist="checklist161" style="top: 10px; left: 10px;"></div>
                    </div>
                      <div class="circle-container-img-17">
                        <div class="circle-img" data-checklist="checklist171" style="top: 10px; left: 10px;"></div>
                    </div>
                      <div class="circle-container-img-18">
                        <div class="circle-img" data-checklist="checklist181" style="top: 10px; left: 10px;"></div>
                    </div>
                      <div class="circle-container-img-19">
                        <div class="circle-img" data-checklist="checklist191" style="top: 10px; left: 10px;"></div>
                    </div>
                      <div class="circle-container-img-20">
                        <div class="circle-img" data-checklist="checklist201" style="top: 10px; left: 10px;"></div>
                    </div>
                      <div class="circle-container-img-21">
                        <div class="circle-img" data-checklist="checklist211" style="top: 10px; left: 10px;"></div>
                    </div>
                     
                      <div class="circle-container-img-24">
                        <div class="circle-img" data-checklist="checklist241" style="top: 10px; left: 10px;"></div>
                    </div>
                      <div class="circle-container-img-25">
                        <div class="circle-img" data-checklist="checklist251" style="top: 10px; left: 10px;"></div>
                    </div>
                    <!-- Add more circle points as needed -->
                `,
  },};

  const { src = '/assets/images/car.png', text = '<p></p>' } = images[type] || {};

  const checklists = {
    checklist1: [
      { id: 'option1', label: 'Pare-choc' },
      { id: 'option2', label: 'Calandre' },
      { id: 'option3', label: 'Capot' },
      { id: 'option4', label: 'Pare-brise' },

  ],
  checklist2: [
      { id: 'option5', label: 'Phare droit' },
      { id: 'option6', label: 'Clignotant droit' },


  ],
  checklist3: [
      { id: 'option8', label: 'Phare gauche' },
      { id: 'option9', label: 'Clignotant gauche' },
  ],
  checklist10: [
      { id: 'option11', label: 'Aile avant gauche' },
      { id: 'option12', label: 'Roue avant gauche' },
      { id: 'option13', label: 'Enjoliveur avant gauche' }

  ],
  checklist9: [
      { id: 'option14', label: 'Aile avant droite' },
      { id: 'option15', label: 'Roue avant droite' },
      { id: 'option16', label: 'Enjoliveur avant droit' }

  ],

  checklist4: [
      { id: 'option17', label: 'Rétroviseur droit ' },
      { id: 'option18', label: 'Porte avant droite ' },
      { id: 'option19', label: 'Poingnée avant droite' },
      { id: 'option18', label: 'Porte arrière droite ' },
      { id: 'option19', label: 'Poingnée arrière droite' },
      { id: 'option20', label: 'Glace' },
      { id: 'option21', label: 'Montant droit' }


  ],
  checklist5: [
      { id: 'option22', label: 'Rétroviseur gauche ' },
      { id: 'option23', label: 'Porte avant gauche ' },
      { id: 'option24', label: 'Poingnée avant gauche' },
      { id: 'option23', label: 'Porte arrière gauche ' },
      { id: 'option24', label: 'Poingnée arrière gauche' },
      { id: 'option25', label: 'Montant gauche ' },
      { id: 'option26', label: 'Glace gauche ' }


  ], checklist12: [
      { id: 'option27', label: 'Glace  arrière gauche' },
      { id: 'option28', label: 'Aile  arrière gauche' },
      { id: 'option29', label: 'Roue  arrière gauche' },


  ], checklist11: [
      { id: 'option30', label: 'Glace  arrière droite' },
      { id: 'option31', label: 'Aile  arrière droite' },
      { id: 'option32', label: 'Roue  arrière droite' },

  ], checklist7: [
      { id: 'option33', label: 'Feu arrière gauche ' },

  ], checklist8: [
      { id: 'option34', label: 'Feu arrière droit ' },


  ], checklist6: [
      { id: 'option35', label: 'Coffre arrière' },
      { id: 'option36', label: 'Pare-choc arrière' },
      { id: 'option37', label: 'Glace arrière' },
  ],    
      checklist13: [
      { id: 'option1', label: 'Pare-choc' },
      { id: 'option2', label: 'Calandre' },
      { id: 'option3', label: 'Capot' },
      { id: 'option4', label: 'Pare-brise' },

  ],
  checklist16: [
      { id: 'option8', label: 'Phare gauche' },
      { id: 'option9', label: 'Clignotant gauche' },
  ],
  checklist15: [
      { id: 'option5', label: 'Phare droit' },
      { id: 'option6', label: 'Clignotant droit' },
  ],
  checklist24: [
      { id: 'option14', label: 'Aile avant droite' },
      { id: 'option15', label: 'Roue avant droite' },
      { id: 'option16', label: 'Enjoliveur avant droit' }

  ],
  checklist25: [
 
      { id: 'option11', label: 'Aile avant gauche' },
      { id: 'option12', label: 'Roue avant gauche' },
      { id: 'option13', label: 'Enjoliveur avant gauche' }
  ],

  checklist18: [
      { id: 'option22', label: 'Rétroviseur gauche ' },
      { id: 'option23', label: 'Porte gauche avant' },
      { id: 'option24', label: 'Poingnée avant gauche' },
      { id: 'option25', label: 'Montant gauche ' },
      { id: 'option26', label: 'Glace gauche ' },
      { id: 'option27', label: 'panneau latérale gauche' },
      { id: 'option28', label: 'Porte latérale ' },
      { id: 'option29', label: 'Roue arrière gauche ' },
      { id: 'option30', label: 'Enjoliveur arrière gauche' }


  ],
  checklist17: [
  
      { id: 'option17', label: 'Rétroviseur droit ' },
      { id: 'option18', label: 'Porte avant droite ' },
      { id: 'option19', label: 'Poingnée avant droite' },
      { id: 'option20', label: 'Glace droit' },
      { id: 'option21', label: 'Montant droit' },
      { id: 'option27', label: 'panneau latérale droit' },
      { id: 'option28', label: 'Porte latérale ' },
      { id: 'option29', label: 'Roue arrière droit ' },
      { id: 'option30', label: 'Enjoliveur arrière droit' }
  ], checklist20: [
      { id: 'option30', label: 'Feu  arrière droit' },



  ], checklist21: [
      { id: 'option30', label: 'Feu  arrière  gauche' },

  ], 

    checklist19: [
      { id: 'option36', label: 'Pare-choc arrière' },
      { id: 'option37', label: 'Porte battante gauche' },
      { id: 'option37', label: 'Porte battante droite' },
      { id: 'option35', label: 'Glace arrière' },

  ],
  checklist101: [
    { id: 'option1', label: 'Pare-choc' },
    { id: 'option2', label: 'Calandre' },
    { id: 'option3', label: 'Capot' },
    { id: 'option4', label: 'Pare-brise' },

],
checklist102: [
    { id: 'option5', label: 'Phare droit' },
    { id: 'option6', label: 'Clignotant droit' },


],
checklist31: [
    { id: 'option8', label: 'Phare gauche' },
    { id: 'option9', label: 'Clignotant gauche' },
],
checklist110: [
    { id: 'option11', label: 'Aile avant gauche' },
    { id: 'option12', label: 'Roue avant gauche' },
    { id: 'option13', label: 'Enjoliveur avant gauche' }

],
checklist91: [
    { id: 'option14', label: 'Aile avant droite' },
    { id: 'option15', label: 'Roue avant droite' },
    { id: 'option16', label: 'Enjoliveur avant droit' }

],

checklist41: [
    { id: 'option17', label: 'Rétroviseur droit ' },
    { id: 'option18', label: 'Porte avant droite ' },
    { id: 'option19', label: 'Poingnée avant droite' },
    { id: 'option18', label: 'Porte arrière droite ' },
    { id: 'option19', label: 'Poingnée arrière droite' },
    { id: 'option20', label: 'Glace' },
    { id: 'option21', label: 'Montant droit' }


],
checklist51: [
    { id: 'option22', label: 'Rétroviseur gauche ' },
    { id: 'option23', label: 'Porte avant gauche ' },
    { id: 'option24', label: 'Poingnée avant gauche' },
    { id: 'option23', label: 'Porte arrière gauche ' },
    { id: 'option24', label: 'Poingnée arrière gauche' },
    { id: 'option25', label: 'Montant gauche ' },
    { id: 'option26', label: 'Glace gauche ' }


], checklist121: [
    { id: 'option27', label: 'Glace  arrière gauche' },
    { id: 'option28', label: 'Aile  arrière gauche' },
    { id: 'option29', label: 'Roue  arrière gauche' },


], checklist111: [
    { id: 'option30', label: 'Glace  arrière droite' },
    { id: 'option31', label: 'Aile  arrière droite' },
    { id: 'option32', label: 'Roue  arrière droite' },

], checklist71: [
    { id: 'option33', label: 'Feu arrière gauche ' },

], checklist81: [
    { id: 'option34', label: 'Feu arrière droit ' },


], checklist61: [
    { id: 'option35', label: 'Coffre arrière' },
    { id: 'option36', label: 'Pare-choc arrière' },
    { id: 'option37', label: 'Glace arrière' },
],    
    checklist131: [
    { id: 'option1', label: 'Pare-choc' },
    { id: 'option2', label: 'Calandre' },
    { id: 'option3', label: 'Capot' },
    { id: 'option4', label: 'Pare-brise' },

],
checklist161: [
    { id: 'option8', label: 'Phare gauche' },
    { id: 'option9', label: 'Clignotant gauche' },
],
checklist151: [
    { id: 'option5', label: 'Phare droit' },
    { id: 'option6', label: 'Clignotant droit' },
],
checklist241: [
    { id: 'option14', label: 'Aile avant droite' },
    { id: 'option15', label: 'Roue avant droite' },
    { id: 'option16', label: 'Enjoliveur avant droit' }

],
checklist251: [

    { id: 'option11', label: 'Aile avant gauche' },
    { id: 'option12', label: 'Roue avant gauche' },
    { id: 'option13', label: 'Enjoliveur avant gauche' }
],

checklist181: [
    { id: 'option22', label: 'Rétroviseur gauche ' },
    { id: 'option23', label: 'Porte gauche avant' },
    { id: 'option24', label: 'Poingnée avant gauche' },
    { id: 'option25', label: 'Montant gauche ' },
    { id: 'option26', label: 'Glace gauche ' },
    { id: 'option27', label: 'panneau latérale gauche' },
    { id: 'option28', label: 'Porte latérale ' },
    { id: 'option29', label: 'Roue arrière gauche ' },
    { id: 'option30', label: 'Enjoliveur arrière gauche' }


],
checklist171: [

    { id: 'option17', label: 'Rétroviseur droit ' },
    { id: 'option18', label: 'Porte avant droite ' },
    { id: 'option19', label: 'Poingnée avant droite' },
    { id: 'option20', label: 'Glace droit' },
    { id: 'option21', label: 'Montant droit' },
    { id: 'option27', label: 'panneau latérale droit' },
    { id: 'option28', label: 'Porte latérale ' },
    { id: 'option29', label: 'Roue arrière droit ' },
    { id: 'option30', label: 'Enjoliveur arrière droit' }

], checklist201: [
    { id: 'option30', label: 'Feu  arrière droit' },



], checklist211: [
    { id: 'option30', label: 'Feu  arrière gauche' },

], 

  checklist191: [
    { id: 'option36', label: 'Pare-choc arrière' },
    { id: 'option37', label: 'Porte battante gauche' },
    { id: 'option37', label: 'Porte battante droite' },
    { id: 'option35', label: 'Glace arrière' },

],



};
const [selectedChecklist, setSelectedChecklist] = useState([]); // Array to store selected checklist IDs
  const [checkedItems, setCheckedItems] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [activeChecklist, setActiveChecklist] = useState(null); // Track the active checklist to show its items

  // Handle circle click to set active checklist (but don't add it to selectedChecklist yet)
  const handleCircleClick = (event) => {
    const checklistId = event.target.getAttribute('data-checklist');
    setActiveChecklist(checklistId); // Set the clicked checklist as active
  };

  // Handle checkbox change when an option is selected/unselected
  const handleCheckboxChange = (checklistId, label) => {
    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = {
        ...prevCheckedItems,
        [checklistId]: {
          ...prevCheckedItems[checklistId],
          [label]: !prevCheckedItems[checklistId]?.[label], // Toggle the checked state of the item
        },
      };

      // Determine if at least one item in the checklist is checked
      const isChecked = Object.values(updatedCheckedItems[checklistId] || {}).some(Boolean);

      // Update selectedChecklist array based on whether any items are checked
      setSelectedChecklist((prevSelectedChecklist) => {
        let newSelectedChecklist = prevSelectedChecklist;

        if (isChecked) {
          // Add the checklist ID if it's not already in the selectedChecklist
          if (!prevSelectedChecklist.includes(checklistId)) {
            newSelectedChecklist = [...prevSelectedChecklist, checklistId];
          }
        } else {
          // Remove the checklist ID if no items are checked
          newSelectedChecklist = prevSelectedChecklist.filter((id) => id !== checklistId);
        }

        // Pass the updated selectedChecklist and inputValue to the parent component
        onChecklistChange(newSelectedChecklist, inputValue);

        return newSelectedChecklist;
      });

      // Collect all checked options across all checklists
      const allCheckedLabels = Object.entries(updatedCheckedItems)
        .flatMap(([id, items]) =>
          Object.entries(items)
            .filter(([_, checked]) => checked) // Only keep the checked items
            .map(([label]) => label)
        )
        .join(', ');

      // Update the input field with all selected options
      setInputValue(allCheckedLabels);

      // Also pass the updated input value to the parent component
      onChecklistChange(selectedChecklist, allCheckedLabels);

      // Call the callback function to pass the updated checked items to the parent
      onChecklistPointSelect(checklistId, updatedCheckedItems);

      return updatedCheckedItems;
    });
  };

  // Handle input value change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Get the items to display for the currently active checklist
  const itemsToDisplay = activeChecklist ? checklists[activeChecklist] : [];

  return (
    <div>
      <div className="car-container" id="carContainer12">
        <input
          type="text"
          id="DegatsapprentsA"
          name="degatsapprents1"
          className="form-control"
          style={{ width: 700 }}
          value={inputValue}
          onChange={handleInputChange}
        />
        <div dangerouslySetInnerHTML={{ __html: text }} onClick={handleCircleClick} />
        <img src={src} alt={type} />
      </div>

      {/* Show checklist options only when a checklist is clicked */}
      {activeChecklist && itemsToDisplay && (
        <div className="checklist">
          <ul>
            {itemsToDisplay.map((item) => (
              <li key={item.id}>
                <label>
                  <input
                    className="checklist-item"
                    type="checkbox"
                    checked={!!checkedItems[activeChecklist]?.[item.label]}
                    onChange={() => handleCheckboxChange(activeChecklist, item.label)}
                  />
                  {item.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;