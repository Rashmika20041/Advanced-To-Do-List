import Select from 'react-select';

type ListItem = {
  name: string;
};

type MyDropdownProps = {
  list: ListItem[];
};

const customStyles = {
  control: (base: any) => ({
    ...base,
    minHeight: '30px',
    height: '25px',
    fontSize: '14px',
    backgroundColor: '#f5f5f5ff',
    outline: 'none',
    boxShadow: 'none',
    borderRadius: '7px',
    border: '1px solid #D1D5DB',
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused ? '#FEF08A' : 'white',
    color: '#1F2937',
    fontSize: '14px',
    cursor: 'pointer',
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    padding: 2,
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: '0 8px',
  }),
  singleValue: (base: any) => ({
    ...base,
    color: '#111827',
  }),
  menu: (base: any) => ({
    ...base,
    zIndex: 9999,
  }),
};

const MyDropdown: React.FC<MyDropdownProps> = ({ list }) => {
  const options = list.map((item) => ({
    value: item.name,
    label: item.name,
  }));

  return (
    <Select
      options={options}
      styles={customStyles}
      placeholder="Select"
      noOptionsMessage={() => "__"}
      isSearchable={false}
    />
  );
};

export default MyDropdown;
