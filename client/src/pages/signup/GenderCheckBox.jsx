import React from "react";

const GenderCheckBox = ({onCheckBoxChange,selectedGender}) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">Male</span>
          <input type="checkbox"  checked={selectedGender==="male"}className="checkbox  border-slate-900" onChange={()=>onCheckBoxChange("male")} />
        </label>
      </div>
      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
           <span className="label-text">Female</span> 
           <input
						type='checkbox'
						className='checkbox border-slate-900'
						// checked={s === "female"}
                        checked={selectedGender==="female"}
                        onChange={()=>onCheckBoxChange("female")}
					 
					/>
        </label>

      </div>
    </div>
  );
};

export default GenderCheckBox;
