function InputField({
    label, 
    name,
    type = "text",
    value, 
    onChange,
    placeholder,
}){
    return(
        <div className="mb-4">
      <label className="block mb-2 text-sm font-medium">
        {label}
      </label>

      <input
      name = {name}
      type = {type}
      value = {value}
      onChange = {onChange}
      placeholder = {placeholder}
      className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default InputField;