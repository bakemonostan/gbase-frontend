<template>
  <nav class="w-full px-10 h-20 bg-gray-400 "></nav>

  <!-- Steps  -->
  <div class="w-full my-20 px-10 h-20  flex justify-center items-center">
    <div class="mt-4">
      <div v-if="page > 0"
        class="rounded-full w-10 bg-green-400 h-12 w-12 text-white flex justify-center items-center font-bold text-2xl mx-auto">
        1</div>
      <button @click="changePage" v-else
        class="rounded-full w-10 h-12 w-12 text-green-400 flex justify-center items-center font-bold text-2xl border-2 border-green-400 mx-auto">
        1</button>
      <p class="text-xs mx-auto pt-1">Upload File </p>
    </div>

    <div class="w-1/12 ounded-lg bg-gray-200 h-2 mx-3"></div>
    <div class="mt-4">
      <div v-if="page > 1"
        class="rounded-full w-10 bg-green-400 h-12 w-12 text-white flex justify-center items-center font-bold text-2xl mx-auto">
        2</div>
      <div v-else
        class="rounded-full w-10 h-12 w-12 text-green-400 flex justify-center items-center font-bold text-2xl border-2 border-green-400 mx-auto">
        2</div>
      <p class="text-xs mx-auto pt-1">Map Columns </p>
    </div>
    <div class="w-1/12 ounded-lg bg-gray-200 h-2 mx-3"></div>
    <div class="mt-4">
      <div v-if="page > 2"
        class="rounded-full w-10 bg-green-400 h-12 w-12 text-white flex justify-center items-center font-bold text-2xl mx-auto">
        3</div>
      <div v-else
        class="rounded-full w-10 h-12 w-12 text-green-400 flex justify-center items-center font-bold text-2xl border-2 border-green-400 mx-auto">
        3</div>
      <p class="text-xs mx-auto pt-1">Repair Problems </p>
    </div>
    <div class="w-1/12 rounded-lg bg-gray-200 h-2 mx-3"></div>
    <div class="mt-4">
      <div v-if="page > 3"
        class="rounded-full w-10 bg-green-400 h-12 w-12 text-white flex justify-center items-center font-bold text-2xl mx-auto">
        4</div>
      <div v-else
        class="rounded-full w-10 h-12 w-12 text-green-400 flex justify-center items-center font-bold text-2xl border-2 border-green-400 mx-auto">
        4</div>
      <p class="text-xs mx-auto pt-1">Import </p>
    </div>

  </div>
  <!-- End Steps -->



  <div class="px-20">
    <div class="flex items-center justify-center w-full bg-gray-200 p-10">
      <div class="extraOutline p-4 bg-white w-full max-w-5xl bg-whtie m-auto rounded-lg">
        <!-- page1  -->
        <div v-if="page == 1" v-bind="getRootProps()"
          class="w-full p-5 relative border-4 border-dotted rounded-lg cursor-pointer"
          :class="!isDragActive ? 'border-gray-300' : 'border-blue-300'">
          <svg class="text-indigo-500 w-24 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" :stroke="!isDragActive ? 'gray' : 'blue'">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.62"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <input v-bind="getInputProps()" class="hidden" accept=".csv" />

          <!-- <p v-if="isDragReject">tHIS IS NOT A CSV FILE </p> -->
          <div v-if="isDragActive" class="flex flex-col w-max mx-auto text-center">
            <p class="mb-2 text-sm dark:text-gray-400" :class="!isDragActive ? ' text-gray-500' : 'text-blue-500'"><span
                class="font-semibold">Drop CSV file here </span>
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400"> </p>

          </div>
          <div v-else class="flex flex-col w-max mx-auto text-center">
            <p class="mb-2 text-sm dark:text-gray-400" :class="!isDragActive ? ' text-gray-500' : 'text-blue-500'"><span
                class="font-semibold">Select a CSV file to
                upload</span>
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">or drag and drop it here </p>

          </div>
        </div>

        <!-- page 2 -->

        <div v-if="page === 2" class="">
          <div class="flex flex-col mt-10">
            <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full">
                    <thead class="bg-gray-100 border-b">
                      <tr>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          v-for="col in page2Headers" :key="col">{{ col }}</th>
                      </tr>

                    </thead>
                    <tbody>
                      <tr class="bg-white border-b" v-for="(row, index) in headers" :key="row">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">matched</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ row }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">columns</td>
                        <td class="px-14 py-4 whitespace-nowrap text-sm font-medium text-gray-900 select">
                          <!-- <pre>
                           selectedAttributesModelValue {{  selectedAttributesModelValue  }}
                          </pre> -->
                          <!-- <pre>
                            attributes {{ notSelectedAttributes }}
                          </pre> -->
                          <select v-model="selectedAttributesModelValue[index]"
                            @change="assignAttributeToColumn(index, selectedAttributesModelValue[index])" :key="row">
                            <option v-for="attribute in notSelectedAttributes" :key="attribute.name"
                              :value="attribute.indexValue" :disabled="attribute.mappedColumnIndex !== null">
                              {{ attribute.name }}
                            </option>
                          </select>
                          <template v-if="selectedAttributesModelValue[index] !== null">
                            <span class="cursor-pointer ml-1"
                              @click="unSelect(index, selectedAttributesModelValue[index])">
                              clear
                            </span>
                          </template>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="flex justify-between w-full">
              <div></div>
              <button @click="mapColumns" class="border border-2 bg-gray-100 p-5 mx-auto my-2">Next</button>
            </div>
          </div>
        </div>
        <template v-if="page == 3">
          <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full">
                  <thead class="bg-gray-100 border-b">
                    <tr>
                      <th 
                        scope="col" 
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        v-for="col in chosenColumns"
                        :key="col.indexValue"
                      >
                        {{ col.name }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-white border-b" v-for="(r, index) in finalCsv" :key="index">
                        <td 
                          class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                          v-for="c in r"
                          :key="c"
                        >
                          {{c}}
                        </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>


    <!-- Table component -->

    <div v-if="page == 1" class="flex flex-col mt-10">
      <h3 v-if="csvData">CSV Preview</h3>
      <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-full">
              <thead class="bg-gray-100 border-b">
                <tr>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left" v-for="header in headers"
                    :key="header">{{ header }}</th>
                </tr>

              </thead>
              <tbody>
                <tr class="bg-white border-b" v-for="row in rows" :key="row[0]">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" v-for="cell in row"
                    :key="cell">{{ cell }}</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="flex justify-between w-full">
        <div></div>
        <button @click="mapColumns" class="border border-2 bg-gray-100 p-5 mx-auto my-2">Next</button>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, computed, reactive } from 'vue';
import { useDropzone } from 'vue3-dropzone';
import Papa from 'papaparse';

export default {
  setup() {
    const { getRootProps, getInputProps, ...rest } = useDropzone({ onDrop });

    const page2Headers = ['MATCHED', 'COLUMN FROM FILE', 'COLUMN VALUES FROM FILE', 'PROSPECT ATTRIBUTES'];
    let csvData = ref(null);
    let selectedAttributesModelValue = ref({});
    let headers = ref([]);
    const rows = ref([]);
    const page = ref(1);
    const finalCsv = ref([]);

    const chosenColumns = computed(() => {
      return attributes.filter(attribute => attribute.mappedColumnIndex !== null);
    });

    const chosenColumnsMapIndex = computed(() => {
      return chosenColumns.value.map(col => col.mappedColumnIndex);
    });

    const attributes = reactive([
      {
        name: 'Unique Id',
        indexValue: 0,
        mappedColumnIndex: null
      },
      {
        name: 'Type',
        indexValue: 1,
        mappedColumnIndex: null
      },
      {
        name: 'Make',
        indexValue: 2,
        mappedColumnIndex: null
      },
      {
        name: 'Model',
        indexValue: 3,
        mappedColumnIndex: null
      },
      {
        name: 'Year',
        indexValue: 4,
        mappedColumnIndex: null
      },
      {
        name: 'Color',
        indexValue: 5,
        mappedColumnIndex: null
      },
      {
        name: 'Condition',
        indexValue: 6,
        mappedColumnIndex: null
      },
      {
        name: 'Case',
        indexValue: 7,
        mappedColumnIndex: null
      },
      {
        name: 'Price',
        indexValue: 8,
        mappedColumnIndex: null
      },
      {
        name: 'Description',
        indexValue: 9,
        mappedColumnIndex: null
      },
      {
        name: 'Picture1',
        indexValue: 10,
        mappedColumnIndex: null
      },
      {
        name: 'Picture2',
        indexValue: 11,
        mappedColumnIndex: null
      }
    ]);

    const notSelectedAttributes = computed(() => {
      return attributes;
    });

    function changePage() {
      // Increment the value of page
      page.value++;
      // Reset page to 1 if it is greater than 3
      if (page.value > 3) {
        page.value = 1;
      }
    }

    function onDrop(acceptFiles) {
      const file = acceptFiles[0];
      const parseFile = async (file) => {

        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = () => {
          const data = reader.result;
          const parsedData = Papa.parse(data);

          csvData.value = parsedData.data;

          //This is used to display the header values on the mapping page
          headers.value = parsedData.data[0];

          //This is used to list out the other rows apart from the header row on the preview page
          rows.value = parsedData.data.slice(1, 5);

          // console.log('csv data', csvData);
          // console.log('header', headers.value);
          // console.log('rows', rows.value);
        }
      }
      parseFile(file);
    }

    const options = reactive({
      multiple: false,
      onDrop,
      accept: '.jpg',
    });

    function mapColumns() {
      //Move to the next conditionally rendered view (Todo: Refactor later)
      page.value++;
      if (page.value === 2) {
        for (let index = 0; index < headers.value.length; index++) {
          selectedAttributesModelValue.value[index] = null;
        }
      } else if (page.value === 3) {
        //do page three stuff

        const finalCsvData = [];

        for(let index = 0; index < csvData.value.length; index++){

          let cc = [];
          for(let deepIndex = 0; deepIndex < csvData.value[index].length; deepIndex++){

            if(chosenColumnsMapIndex.value.includes(deepIndex)){
              cc.push(csvData.value[index][deepIndex]);
            }
          }

          finalCsvData.push(cc);
        }

        finalCsv.value = finalCsvData;
      }
    }

    function assignAttributeToColumn(columnToBeMappedRowIndex, selectedAttributeIndex) {
      attributes[selectedAttributeIndex].mappedColumnIndex = columnToBeMappedRowIndex;
    }

    function unSelect(selectedAttributeIndex, attr) {
      attributes[attr].mappedColumnIndex = null;
      selectedAttributesModelValue.value[selectedAttributeIndex] = null;
    }

    return {
      headers,
      rows,
      getRootProps,
      getInputProps,
      page,
      changePage,
      mapColumns,
      csvData,
      page2Headers,
      get remainingColumns() {
        return columns.filter((column) => !selectedColumns.value.includes(column));
      },
      assignAttributeToColumn,
      unSelect,
      notSelectedAttributes,
      selectedAttributesModelValue,
      finalCsv,
      chosenColumns,
      ...rest
    }
  }
}
</script>
<style lang="scss" scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

:root {
  --select-border: #777;
  --select-focus: blue;
  --select-arrow: var(--select-border);
}

select {
  // A reset of styles, including removing the default dropdown arrow
  border: solid 1px #7777;
  padding: 0 1em;
  margin: 0;
  width: 100%;
  cursor: pointer;
  line-height: inherit;
  outline: #7777;
  // Stack above custom arrow
  z-index: 1;
}

option {
  outline: #7777;
  padding: 0, 2px;

}


.table {
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-right: 1px solid rgb(31, 27, 27);
    text-align: left;
  }

  th {
    background-color: #f8f9fa;
    cursor: pointer;

    &:hover {
      background-color: #e9ecef;
    }
  }

  tr:nth-child(odd) {
    background-color: #f8f9fa;
  }

  tr:nth-child(even) {
    background-color: #fff;
  }
}
</style>