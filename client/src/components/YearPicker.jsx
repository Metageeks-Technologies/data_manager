import { Select, Option } from "@material-tailwind/react";
 
export default function Example() {
  return (
    <div className="w-72">
      <Select color="blue" label="Select Version">
        <Option>Material Tailwind HTML</Option>
        <Option>Material Tailwind React</Option>
        <Option>Material Tailwind Vue</Option>
        <Option>Material Tailwind Angular</Option>
        <Option>Material Tailwind Svelte</Option>
      </Select>
        
    </div>
  );
}