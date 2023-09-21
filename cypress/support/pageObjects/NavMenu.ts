var  isLeftNavMenuHidden = (className:any):boolean => {
    var state:boolean = false
    cy.get('header').invoke('attr','class').then( value=>{
       
       //console.log('val1: '+(value+'').length)
      // console.log('val2: '+(className+'').length)
        if ( (value+'').trim()==className+''.trim()){
            console.log('MATCHED')
            console.log("state1: "+state)
         state=true 
         console.log("state2: "+state)
        }
        })
        console.log("state3: "+state)
        return state;
    }


export class NavMenu {
   
    showHideMenu (){
        cy.get('header').invoke('attr','class').then( classNameBefore=>{
           // cy.get('[data-test="drawer-icon"]').click()
        console.log("click1 STATE: "+isLeftNavMenuHidden(classNameBefore))
        cy.get('[data-test="drawer-icon"]').click()
        console.log("click2 STATE: "+isLeftNavMenuHidden(classNameBefore))
        })
        
    }  

    
    }
 


export var leftNavMenu: NavMenu = new NavMenu();

