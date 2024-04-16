import React, { useEffect, useState, useRef } from 'react'

/* mui style & etc */

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Slider from '@mui/material/Slider'
import { Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'; 
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { axisClasses } from '@mui/x-charts';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
/* mui style & etc */

/* */

import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import QuizIcon from '@mui/icons-material/Quiz';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {  Unstable_NumberInput as BaseNumberInput,
  numberInputClasses } from '@mui/base/Unstable_NumberInput';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FilterListIcon from '@mui/icons-material/FilterList';
import dayjs, { Dayjs } from 'dayjs'
import TableRowsIcon from '@mui/icons-material/TableRows';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { parse } from 'papaparse';
import { toast } from 'react-toastify';
import { AlignHorizontalCenter, CheckBox, OtherHouses } from '@mui/icons-material';
import { faker } from '@faker-js/faker';

/* */

const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const StyledInputRoot = styled('div')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  display: grid;
  grid-template-columns: 1fr 19px;
  grid-template-rows: 1fr 1fr;
  overflow: hidden;
  column-gap: 8px;
  padding: 4px;

  &.${numberInputClasses.focused} {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  &:hover {
    border-color: ${blue[400]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

const StyledInputElement = styled('input')(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  grid-column: 1/2;
  grid-row: 1/3;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
`,
);

const StyledButton = styled('button')(
  ({ theme }) => `
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  appearance: none;
  padding: 0;
  width: 19px;
  height: 19px;
  font-family: system-ui, sans-serif;
  font-size: 0.875rem;
  line-height: 1;
  box-sizing: border-box;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 0;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    cursor: pointer;
  }

  &.${numberInputClasses.incrementButton} {
    grid-column: 2/3;
    grid-row: 1/2;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border: 1px solid;
    border-bottom: 0;
    &:hover {
      cursor: pointer;
      background: ${blue[400]};
      color: ${grey[50]};
    }

  border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  }

  &.${numberInputClasses.decrementButton} {
    grid-column: 2/3;
    grid-row: 2/3;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border: 1px solid;
    &:hover {
      cursor: pointer;
      background: ${blue[400]};
      color: ${grey[50]};
    }

  border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  }
  & .arrow {
    transform: translateY(-1px);
  }
`,
);

const ViewTable = () => {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  const [Doc, setDoc] = useState('')
  const [DocDesc, setDocDesc] = useState('')
  const [DataToSet, setDataToSet] = useState([])
  const [UpdatedData, setUpdatedData] = useState([]) 
  const [EstimatedRange, setEstimatedRange] = useState([])
  const [RangeTime, setRangeTime] = useState(20)
  const [NumberFields, setNumberFields] = useState(2)
  const [inputEnabled, setInputEnabled] = useState(true) 
   
  const [Name, setName] = useState('')
  const [IPAddress, setIPAddress] = useState('')
  const [RegistrationFirst, setRegistrationFirst] = useState('')
  const [RegistrationAmmount, setRegistrationAmmount] = useState('') 
  let DatePickRef = useRef()

  const [DateUpdated, setDateUpdated] = useState(dayjs('2022-04-17'))
  const [Frequency, setFrequency] = useState('')
  const [IsEnabled, setIsEnabled] = useState(false)
  const [SelectedUser, setSelectedUser] = useState('')
  const [UsersList, setUsersList] = useState([])
  const [TableHeaders, setTableHeaders] = useState([])

  function FetchUsersToArr() {

    let requestOptions = {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        //'Access-Control-Allow-Origin': '*',
        //'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Authorization': 'Basic ' + btoa(`${process.env.REACT_APP_LOGIN_AUTH}:${process.env.REACT_APP_PASSWD_AUTH}`)
      }, 
    };
    
    fetch(`${process.env.REACT_APP_API_LINK}/users/?format=json`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(response);
        }
        return response.json();
      })
      .then(data => {
        setUsersList(data);
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error)})  

  }

  useEffect(() => {
    FetchUsersToArr()
  }, [])

  function FetchTableName() {
    if(DataToSet[0] != undefined) {
      setTableHeaders(Object.getOwnPropertyNames(DataToSet[0]))
    }
  } 

  useEffect(() => {
    FetchTableName()
  }, [DataToSet])

  const [itemNb, setItemNb] = useState(5); 

    /* new chart */
  
  let options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: false,
        text: 'Wykres BrewControl',
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: true,
        },
      },
      y2: {
        type: 'linear',
        display: false,
        position: 'right',
        grid: {
          drawOnChartArea: true,
        },
      },
    },
  }; 
  
  const indexToAccess = 0; 
  const newPropertyName = "FirstUserProperty";
  const newPropertyName1 = "SecondUserProperty";
  const newPropertyName2 = "ThirdUserProperty";      
  const newPropertyName3 = "FourthUserProperty";      
  const newPropertyName4 = "FifthUserProperty";      
  const newPropertyName5 = "SixthUserProperty";   
  
  let EstimatedR = DataToSet.map((obj, item, index) => {
    const updatedObj = { ...obj };   
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        if (i === indexToAccess) {
            updatedObj[newPropertyName] = obj[keys[i]]; 
            updatedObj[newPropertyName1] = obj[keys[1]];
            updatedObj[newPropertyName2] = obj[keys[2]]; 
            updatedObj[newPropertyName3] = obj[keys[3]]; 
            updatedObj[newPropertyName4] = obj[keys[4]];
            updatedObj[newPropertyName5] = obj[keys[5]];
        } else {
            updatedObj[keys[i]] = obj[keys[i]];
        }
    }  

  return updatedObj.FirstUserProperty.slice(-9)}) 

  let RangeOneItem = DataToSet.map((obj, item, index) => {
    const updatedObj = { ...obj };   
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        if (i === indexToAccess) {
            updatedObj[newPropertyName] = obj[keys[i]]; 
            updatedObj[newPropertyName1] = obj[keys[1]];
            updatedObj[newPropertyName2] = obj[keys[2]]; 
            updatedObj[newPropertyName3] = obj[keys[3]]; 
            updatedObj[newPropertyName4] = obj[keys[4]];
            updatedObj[newPropertyName5] = obj[keys[5]];
        } else {
            updatedObj[keys[i]] = obj[keys[i]];
        }
    }  

  return updatedObj})  

  const labels = EstimatedR.slice(0, RangeTime) 

  const data = {
    labels,
    datasets: [
      {
        label: TableHeaders[5] ? TableHeaders[5] : 'Brak danych',
        data: DataToSet.map((obj, item, index) => {
          const updatedObj = { ...obj };   
          const keys = Object.keys(obj);
          for (let i = 0; i < keys.length; i++) {
              if (i === indexToAccess) {
                  updatedObj[newPropertyName] = obj[keys[i]]; 
                  updatedObj[newPropertyName1] = obj[keys[1]];
                  updatedObj[newPropertyName2] = obj[keys[2]]; 
                  updatedObj[newPropertyName3] = obj[keys[3]]; 
                  updatedObj[newPropertyName4] = obj[keys[4]];
                  updatedObj[newPropertyName5] = obj[keys[5]];
              } else {
                  updatedObj[keys[i]] = obj[keys[i]];
              }
          } 
          return updatedObj.SixthUserProperty
         
        }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
      {
        label: TableHeaders[4] ? TableHeaders[4] : 'Brak danych',
        data: DataToSet.map((item) => item.Predk_Rolka_2 * 1),
        borderColor: 'rgb(34,139,34)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1',
      },
      {
        label: TableHeaders[3] ? TableHeaders[3] : 'Brak danych',
        data: DataToSet.map((item) => item.Wydajnosc_Chwilowa_Gran_T_h),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y2',
      },
    ],
  };

  /* new chart */ 

      let AvailableTime = [
      {item: 10}, 
      {item: 20},
      {item: 30}
      ]

      const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      })); 

      const formData = new FormData();
      formData.append('file', Doc);
      formData.append('description', DocDesc);
      
      const SecformData = new FormData();
      SecformData.append('device-data', Name);
      SecformData.append('device-data', IPAddress);
      SecformData.append('device-data', RegistrationFirst);
      SecformData.append('device-data', RegistrationAmmount);
      SecformData.append('device-data', DateUpdated);
      SecformData.append('device-data', Frequency);
      SecformData.append('device-data', IsEnabled);
      SecformData.append('device-data', SelectedUser);

      function handleChangeFile(event) {
        setDoc(event.target.files[0]) 
        toast.info('Przesłano plik')

        Array.from(event.target.files).filter((file) =>
        file.type === "text/csv").forEach(async (file) => {
            const text = await file.text()
            const result = parse(text, { header: true })
            console.log(result)
            setDataToSet(result.data)
        })

      }    

      function EstimatedTimeSetter() {
        if(DataToSet != []) {
           // setEstimatedDate(DataToSet.map(item => { return  {time: item.date.slice(-8) } } ))
        }
       
      }

      function EstimatedDateSetter() {
        if(DataToSet != []) {
         //   setEstimatedDate(DataToSet.map(item => { return  {time: item.date.slice(0, -9) } } ))
        }
       
      }  
 
      //const value = DataToSet.reduce((result, obj) => result[0], Object.values(DataToSet[0]));
      //console.log(DataToSet[0] ? DataToSet.reduce((result, obj) => result, Object.values(DataToSet)) : 'no')

      function FileSender() {

        let requestOptions = {
          method: 'POST', 
          headers: {
            //'Content-Type': 'application/json',
            //'Access-Control-Allow-Origin': '*',
            //'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
            'Authorization': 'Basic ' + btoa(`${process.env.REACT_APP_LOGIN_AUTH}:${process.env.REACT_APP_PASSWD_AUTH}`)
          },
          body: formData
        };
        
        fetch(`${process.env.REACT_APP_API_LINK}/files/`, requestOptions)
          .then(response => {
            if (!response.ok) {
              throw new Error(response);
            }
            return response.json();
          })
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error('There was a problem with your fetch operation:', error)})
      }  

      useEffect(() => {

        if(Doc != '') {
          //formData.get(Doc)
          FileSender()
          //console.log(Doc)
        }

      }, [Doc])

      useEffect(() => {
        EstimatedTimeSetter()
      }, [DataToSet])

      useEffect(() => {
        EstimatedDateSetter()
      }, [DataToSet])

      const handleItemNbChange = (event, newValue) => {
        if (typeof newValue !== 'number') {
          return;
        }
        setItemNb(newValue);
      };

      function RecordAdd() {

        if(Name == '' || IPAddress == '' && RegistrationFirst == 2) {
          toast.error('Nie uzupełniono pól!')
        } else if(Name == '' || IPAddress == '' || RegistrationFirst == 0 && RegistrationAmmount == 0) {
          toast.error('Nie uzupełniono pól!')
        } else if(Name == '' || IPAddress == '' || RegistrationFirst == 0 && RegistrationAmmount == 0 && DateUpdated == 4) {
          toast.error('Nie uzupełniono pól!')
        } else { 

          toast.success('Dodano nowy rekord do bazy danych')

          let requestOptions = {
            method: 'POST', 
            headers: {
              //'Content-Type': 'application/json',
              //'Access-Control-Allow-Origin': '*',
              //'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
              'Authorization': 'Basic ' + btoa(`${process.env.REACT_APP_LOGIN_AUTH}:${process.env.REACT_APP_PASSWD_AUTH}`)
            },
            body: SecformData
          };
          
          fetch(`${process.env.REACT_APP_API_LINK}/whole-data/`, requestOptions)
            .then(response => {
              if (!response.ok) {
                throw new Error(response);
              }
              return response.json();
            })
            .then(data => {
              console.log(data);
            })
            .catch(error => {
              console.error('There was a problem with your fetch operation:', error)}) 
        }

      }
 
      useEffect(() => {
        if(DocDesc == '') {
          setInputEnabled(true)
        } else {
          setInputEnabled(false)
        }
      }, [DocDesc]) 


  return ( 

    <div 
  className="container-column w-100 blacker_orange"
  style={{ minHeight: '100vh' }}>
    <div className='widget_bigger_ landscape'>
            <h2 className='container-row justify-start'>
                <TableRowsIcon style={{ fontSize: '36px', margin: '7px 15px 15px 0px' }}/>
                Tabela informacji
            </h2>
            <TableContainer className='Table__'  component={Paper} >
            <Table sx={{ minWidth: 700}} aria-label="customized table">
              <TableHead className='customized_table__'>
                <TableRow
                className='flex_fix_table'
                > 
                {TableHeaders == [] ? <StyledTableCell>Brak danych</StyledTableCell> :
                TableHeaders.map((item, index) => <StyledTableCell>{item}</StyledTableCell>)} 
                </TableRow>
              </TableHead>
              <TableBody> 
                {UpdatedData == [] ? <div>
                    <h2>Brak danych</h2>
                </div> : DataToSet.map((obj, item, index) => {
                  const updatedObj = { ...obj };   
                  const keys = Object.keys(obj);
                  for (let i = 0; i < keys.length; i++) {
                      if (i === indexToAccess) {
                          updatedObj[newPropertyName] = obj[keys[i]]; 
                          updatedObj[newPropertyName1] = obj[keys[1]];
                          updatedObj[newPropertyName2] = obj[keys[2]]; 
                          updatedObj[newPropertyName3] = obj[keys[3]]; 
                          updatedObj[newPropertyName4] = obj[keys[4]];
                          updatedObj[newPropertyName5] = obj[keys[5]];
                      } else {
                          updatedObj[keys[i]] = obj[keys[i]];
                      }
                  } 
                  return <>
                  <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                  {updatedObj.FirstUserProperty}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                  {updatedObj.SecondUserProperty}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                  {updatedObj.ThirdUserProperty}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                  {updatedObj.FourthUserProperty}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                  {updatedObj.FifthUserProperty}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                  {updatedObj.SixthUserProperty}
                  </StyledTableCell>
                  </StyledTableRow>
                  </>  
                })} 
              </TableBody>
            </Table>
            </TableContainer> 
              
    </div>
    <div className='widget_bigger_ landscape'>
    <Stack spacing={2} direction="row">
      <Button 
      color={inputEnabled ? 'error' : 'info'}  
      variant="contained" >
      <input disabled={inputEnabled} className='SelectorThumbnail' onChange={handleChangeFile} accept='text/csv' style={{ position: 'absolute', overflow: 'hidden', height: '100%', width: '100%', opacity: 0 }} type="file"/>
      {inputEnabled ? 'Brak opisu' : ' Prześlij'}<AddCircleOutlineIcon style={{ margin: '0 -2.5px 0 5px' }}/>
        </Button>

        <TextField label={'Opis'} value={DocDesc} onChange={(e) => setDocDesc(e.target.value)} ></TextField>
        
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Zakres danych (ilość)</InputLabel>
          <Select 
          onChange={(e) => setRangeTime(e.target.value)}
          defaultValue={10}
          label={'Zakres danych ilo'}
          > 
          <MenuItem value={'no_selected'} selected>Nie wybrano</MenuItem>
            {AvailableTime.map(item => <MenuItem value={item.item}>{item.item}</MenuItem>)}
            </Select>
        </FormControl>   

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Wybrany element (#1)</InputLabel>
          <Select label={'Zakres danych ilo'}> 
           
            <MenuItem>Dane #1</MenuItem>
            </Select>
        </FormControl> 

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Wybrany element (#2)</InputLabel>
          <Select label={'Zakres danych ilo'}> 
        
          <MenuItem>Dane #2</MenuItem>
            </Select>
        </FormControl> 

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Wybrany element (#3)</InputLabel>
          <Select label={'Zakres danych ilo'}> 
      
          <MenuItem>Dane #3</MenuItem>
            </Select>
        </FormControl> 

    </Stack>
    </div>
    <div className="container-row-column-mobile w-100 ">
    <div className='widget_bigger_ landscape w-50-m-100 DesktopWidthFixHalf_'>
            <h2 className='container-row justify-start'>
                <LibraryAddCheckIcon style={{ fontSize: '36px', margin: '7px 15px 15px 0px' }}/>
                Szczegóły
            </h2>
            <Line options={options} data={data} />
    </div>
    <div className='widget_bigger_ landscape w-50-m-100 DesktopWidthFixHalf__'>
            <h2 className='container-row justify-start'>
                <PostAddIcon style={{ fontSize: '42px', margin: '2px 8px 4px 0px' }}/>
                Nowe urządzenie
            </h2> 
            <div className='mg-10'>
              <Stack spacing={2} direction={'column'}>

              <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Ilość pól</InputLabel>
          <Select 
          onChange={(e) => setNumberFields(e.target.value)}
          defaultValue={2}
          label={'Ilość p'}
          >  
             <MenuItem value={2}>{2}</MenuItem> 
             <MenuItem value={3}>{3}</MenuItem> 
             <MenuItem value={4}>{4}</MenuItem>  
             <MenuItem value={5}>{5}</MenuItem>  
             <MenuItem value={6}>{6}</MenuItem>  
             <MenuItem value={7}>{7}</MenuItem>  
             <MenuItem value={8}>{8}</MenuItem>  
            </Select>
        </FormControl>  
                
              <TextField fullWidth onChange={(e) => setName(e.target.value)} value={Name} style={{ display: 
                NumberFields == 2 || 
                NumberFields == 3 || 
                NumberFields == 4 ||
                NumberFields == 5 ||
                NumberFields == 6 ||
                NumberFields == 7 ||
                NumberFields == 8 ? 
                'block' : 'none' }} id="outlined-basic" label="Nazwa urządzenia" variant="filled" />
              <TextField fullWidth onChange={(e) => setIPAddress(e.target.value)} value={IPAddress} style={{ display:  NumberFields == 2 || 
                NumberFields == 3 || 
                NumberFields == 4 ||
                NumberFields == 5 ||
                NumberFields == 6 ||
                NumberFields == 7 ||
                NumberFields == 8 ? 'block' : 'none' }} id="outlined-basic" label="Adres IP" variant="filled" />
              <div className='container-row wrap align-items-center w-100 mg-10 justify-start'
              
              style={{ display:  
                NumberFields == 3 || 
                NumberFields == 4 ||
                NumberFields == 5 ||
                NumberFields == 6 ||
                NumberFields == 7 ||
                NumberFields == 8 ? 'flex' : 'none' }}

              > 
              <InputLabel>
              Rejestracja pierwsza:
               </InputLabel>
              <BaseNumberInput
              onChange={(e) => setRegistrationFirst(e.target.value)} 
              value={RegistrationFirst} 
              style={{ margin: '0 15px' }}
              slots={{
              root: StyledInputRoot,
              input: StyledInputElement,
              incrementButton: StyledButton,
              decrementButton: StyledButton,
              }}
              slotProps={{
              incrementButton: {
               children: '▴',
              },
              decrementButton: {
               children: '▾',
              },
              }} 
              />
               </div>
              <div className='container-row wrap align-items-center w-100 mg-10 justify-start'
              style={{ display:  
                NumberFields == 4 ||
                NumberFields == 5 ||
                NumberFields == 6 ||
                NumberFields == 7 ||
                NumberFields == 8 ? 'flex' : 'none' }}
              > 
              <InputLabel>
              Numer Rejestracji:
               </InputLabel>
              <BaseNumberInput  
              onChange={(e) => setRegistrationAmmount(e.target.value)} 
              value={RegistrationAmmount}
              style={{ margin: '0 15px' }} 
              slots={{
              root: StyledInputRoot,
              input: StyledInputElement,
              incrementButton: StyledButton,
              decrementButton: StyledButton,
              }}
              slotProps={{
              incrementButton: {
               children: '▴',
              },
              decrementButton: {
               children: '▾',
              },
              }} 
              />
              </div>
              <div className='container-row wrap align-items-center w-100 mg-10 justify-start'
             style={{ display:   
              NumberFields == 5 ||
              NumberFields == 6 ||
              NumberFields == 7 ||
              NumberFields == 8 ? 'flex' : 'none' }}
              > 
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker 
              style={{ margin: '0 15px' }}
              ref={DatePickRef}
              defaultValue={dayjs(Date.now())}
              value={DateUpdated}
              onChange={(newValue) => setDateUpdated(newValue)}
              label="Data aktualizacji" />
              </LocalizationProvider>
              </div> 
              <div className='container-row wrap align-items-center w-100 mg-10 justify-start'
             style={{ display:    
              NumberFields == 6 ||
              NumberFields == 7 ||
              NumberFields == 8 ? 'flex' : 'none' }}
              > 
              <InputLabel>
              Częstotliwość:
               </InputLabel>
              <BaseNumberInput
              style={{ margin: '0 15px' }}
              onChange={(e) => setFrequency(e.target.value)}
              value={Frequency}
              slots={{
              root: StyledInputRoot,
              input: StyledInputElement,
              incrementButton: StyledButton,
              decrementButton: StyledButton,
              }}
              slotProps={{
              incrementButton: {
               children: '▴',
              },
              decrementButton: {
               children: '▾',
              },
              }} 
              />
              </div> 
              </Stack> 
              <div className='container-row wrap align-items-center mg-15'
              
              style={{ display: NumberFields == 7 || NumberFields == 8 ? 'flex' : 'none'}}
               
              > 
              <InputLabel>
              Włączony?
               </InputLabel>
              <Checkbox value={IsEnabled} onChange={(e) => setIsEnabled(e.target.value)} aria-label='Włączony?' /> 
              </div> 
              <FormControl fullWidth style={{ display: NumberFields == 8 ? 'flex' : 'none'}} >
          <InputLabel>Użytkownik</InputLabel>
          <Select 
          
          value={SelectedUser}
          onChange={(e) => setSelectedUser(e.target.value)} 
          label={'Użytkown'}
          >  

          {UsersList == [] ? <MenuItem value={'Jan'}>Jan</MenuItem> :
          
          UsersList.map(item => <MenuItem value={item.first_name}>
          {item.first_name + ' ' + item.last_name}
          </MenuItem> )

          } 
            </Select>
              </FormControl>  
            <Stack spacing={2} direction="row">
            <Button onClick={RecordAdd} variant="contained" style={{ margin: '15px 0' }}>
            Dodaj urządzenie<AddCircleOutlineIcon style={{ margin: '0 -2.5px 0 5px' }}/>
            </Button> 
            </Stack>

        </div>


    </div>
    </div>
  </div>
  )
}

export default ViewTable