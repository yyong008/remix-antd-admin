import { Select } from "antd";
import { useState } from "react";

type LocalModels = {
  list: {
    models: any[];
  };
};

const LocalModels = ({ list }: LocalModels) => {
  const [value, setValue] = useState<string>();

  const handleSearch = (newValue: string) => {};

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="flex justify-center  bg-slate-250 w-[100%]">
      <Select
        showSearch
        variant="borderless"
        value={value}
        placeholder="选择一个模型"
        defaultActiveFirstOption={false}
        suffixIcon={null}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        notFoundContent={null}
        options={(list?.models || [])?.map((d: any) => ({
          value: d.name,
          label: d.name,
        }))}
      />
    </div>
  );
};

export { LocalModels };
