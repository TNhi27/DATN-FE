const Validator = (option) => {

    option.rules.map(rule => {
        const input = rule.element.current;
        input.onblur=()=>{
             const mess = rule.test(input.value)
            input.parentElement.querySelector('small').innerText=mess==undefined?"":mess;
        }
       
        
    })

}

Validator.isRequired = (element) => {
    return {
        element: element,
        test: (value) => {
            return value.trim() ? undefined : " Không được để trống trường này !"
        }
    }
}

Validator.isEmail = (element) => {
    return {
        element: element,
        test: (value) => {
            const r =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

            return r.test(value)?undefined:"Email không hợp lệ";

        }
    }
}

Validator.isNumberPhone =(element)=>{
    return {
        element: element,
        test: (value) => {
            const r = /\d/g;
           if (r.test(value)) {
               return value.length === 10 ? undefined :"Số điện thoại không hợp lệ"
           }else{
               return "Số điện thoại không hợp lệ"
           }
        }
    }
}


export default Validator