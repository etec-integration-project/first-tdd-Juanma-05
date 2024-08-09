import * as React from 'react';
import * as tf from '@tensorflow/tfjs'; // Importar TensorFlow.js
import dataset from './data/dataset.txt';
import autocorrect_model from "../../../public/autocorrect_model (4).json"

// Constantes para parámetros del modelo de autocorrección
const ALPHA_LEN = 26;
const sample_len = 1;
const batch_size = 32;
const epochs = 250;
const max_len = 10;
let words = []; // Arreglo para almacenar las palabras del dataset
let model; // Variable para almacenar el modelo

function setup() {
    document.getElementById('file')
      .addEventListener('change', function() {
        var fr = new FileReader();
        fr.onload = function() {
          var result = fr.result;
          var filesize = result.length;
          var delimiters = ['\r\n', ',', '\t'];
          document.getElementById('file_name').innerText = "Supported format: csv, tsv, txt.";
          for (let i in delimiters) {
            var length = result.split(delimiters[i]).length;
            if (length !== filesize && length > 1) {
              var words = result.split(delimiters[i]);
              document.getElementById('file_name').innerText = document.getElementById('file').files[0].name;
            }
          }
        }
        fr.readAsText(this.files[0]);
      });
  }
  


// Definir estilos para el contenedor de búsqueda
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

// Definir estilos para el icono de búsqueda
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// Definir estilos para el componente de entrada de búsqueda
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


//Función asincrónica para cargar el dataset
const loadDataset = () => {
  fetch(dataset)
    .then(response => response.text())
    .then(text => {
      words = text.split(",");
      console.log('Dataset cargado:', words.length, 'palabras', words);
    })
    .catch(error => console.error('Error al cargar el dataset:', error));
};



// Función asincrónica para cargar el modelo
const loadModel = () => {
  return fetch(autocorrect_model)
    .then(response => response.json())
    .then(modelJSON => {
      model = tf.loadLayersModel(tf.io.fromMemory(modelJSON));
      console.log('Modelo cargado exitosamente'); // Imprimir mensaje de éxito en la consola
    })
    .catch(error => {
      console.error('Error al cargar el modelo:', error); // Imprimir mensaje de error en la consola
      throw error; // Rechazar la promesa con el error correspondiente
    });
};


loadDataset(); // Cargar el dataset y luego el modelo

loadModel();

setup();

// Componente funcional SearchWithAutocomplete
export default function SearchWithAutocomplete() {
  const [searchTerm, setSearchTerm] = React.useState(''); // Estado para el término de búsqueda

  // Manejador de evento para la tecla Enter
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      // Realizar la búsqueda con el término de búsqueda
      console.log('Búsqueda:', searchTerm);
    }
  };

  // Manejador de evento para el autocompletado
  const handleAutoComplete = async (e) => {
    const inputValue = e.target.value; // Obtener el valor de entrada
    const autoCompletedValue = await getAutoCompletedValue(inputValue); // Obtener el valor autocompletado
    setSearchTerm(autoCompletedValue); // Establecer el término de búsqueda con el valor autocompletado
  };

  // Función asincrónica para obtener el valor autocompletado
  async function getAutoCompletedValue(inputValue) {
    if (!model) {
      console.warn('El modelo no está cargado'); // Imprimir advertencia en la consola si el modelo no está cargado
      return inputValue; // Devolver el valor de entrada si el modelo no está cargado
    }
  
    const pred_features = preprocessing_stage_2([inputValue], max_len); // Obtener características predichas
    const pred_features_tensor = preprocessing_stage_5(pred_features, max_len, ALPHA_LEN); // Convertir a tensor
    const pred_labels = model.predict(pred_features_tensor); // Realizar predicción con el modelo
    const pred_labels_array = postprocessing_stage_1(pred_labels); // Convertir predicciones a arreglo
    const autoCompletedValue = postprocessing_stage_2(pred_labels_array, max_len)[0].join(''); // Obtener valor autocompletado
    console.log('Valor autocompletado:', autoCompletedValue); // Imprimir valor autocompletado en la consola
    return autoCompletedValue; // Devolver valor autocompletado
  }
  
  // Función de preprocesamiento: Filtrar palabras válidas
  function preprocessing_stage_1(words, max_len) {
    let filtered_words = [];
    const pattern = new RegExp(`^[a-z]{1,${max_len}}$`);
    for (let i in words) {
      const is_valid = pattern.test(words[i]);
      if (is_valid) filtered_words.push(words[i]);
    }
    return filtered_words;
  }

  // Función de preprocesamiento: Convertir palabras a enteros
  function preprocessing_stage_2(words, max_len) {
    let int_words = [];
    for (let i in words) {
      int_words.push(word_to_int(words[i], max_len));
    }
    return int_words;
  }

  // Otras funciones de preprocesamiento, pero no se utilizan en el componente actualmente

  // Función de preprocesamiento: Convertir palabras a tensores one-hot
  function preprocessing_stage_5(words, max_len, alpha_len) {
    return tf.oneHot(tf.tensor2d(words, [words.length, max_len], 'int32'), alpha_len);
  }

  // Función de postprocesamiento: Convertir predicciones a arreglo
  function postprocessing_stage_1(words) {
    return words.argMax(-1).arraySync();
  }

  // Función de postprocesamiento: Convertir enteros a palabras
  function postprocessing_stage_2(words, max_len) {
    let results = [];
    for (let i in words) {
      results.push(int_to_word(words[i], max_len));
    }
    return results;
  }

  // Función para convertir palabra a un arreglo de enteros
  function word_to_int(word, max_len) {
    let encode = [];
    for (let i = 0; i < max_len; i++) {
      if (i < word.length) {
        let letter = word.slice(i, i + 1);
        encode.push(letter.charCodeAt(0) - 96);
      } else {
        encode.push(0);
      }
    }
    return encode;
  }

  // Función para convertir enteros a palabra
  function int_to_word(word, max_len) {
    let decode = [];
    for (let i = 0; i < max_len; i++) {
      if (word[i] === 0) {
        decode.push('');
      } else {
        decode.push(String.fromCharCode(word[i] + 96));
      }
    }
    return decode;
  }

  // Renderizar el componente de búsqueda con autocompletado
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search' }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch}
        onKeyUp={handleAutoComplete} // Pasar handleAutoComplete como prop
      />
    </Search>
  );
}