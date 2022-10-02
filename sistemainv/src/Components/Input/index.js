export default function Input({legend, name}){
    return(
        <label for={name}>{legend}<input type="text" id={name}/></label>
    )
}