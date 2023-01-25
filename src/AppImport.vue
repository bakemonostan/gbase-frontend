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
                      <tr class="bg-white border-b" v-for="row in headers" :key="row">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">matched</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ row }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">columns</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 select">
                          <select v-model="selectedColumn" @change="addColumn">
                            <option v-for="column in remainingColumns" :key="column" :value="column">{{ column }}
                            </option>
                          </select>
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
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    v-for="header in headers" :key="header">{{ header }}</th>
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
import { ref, computed, watch, reactive } from 'vue'
import Papa from 'papaparse'
import { useDropzone } from "vue3-dropzone";

export default {
  setup() {
    // const input = ref(null)
    const page2Headers = ['MATCHED', 'COLUMN FROM FILE', 'COLUMN VALUES FROM FILE', 'PROSPECT ATTRIBUTES']
    let csvData = ref(null)
    let mappingObj = ref({});
    let headers = ref([])
    const rows = ref([])
    const page = ref(1)
    const selectedColumns = ref([]);
    const selectedColumn = ref(null);
    // const columnHeader = reactive({
    //   'Unique Id': [],
    //   Type: [],
    //   Make: [],
    //   Model: [],
    //   Year: [],
    //   Color: [],
    //   Condition: [],
    //   Case: [],
    //   Price: [],
    //   Description: [],
    //   Picture1: [],
    //   Picture2: [],
    //   Picture3: [],
    //   Picture4: [],
    //   Picture5: [],
    //   Picture6: [],
    //   'Dealer Key': [],
    //   'Dealer Notes': [],
    //   'Offsite Link #1 Label': [],
    //   'Offsite Link #1 Url': [],
    //   'Offsite Link #2 Label': [],
    //   'Offsite Link #2 Url': []
    // })

    const columnHeader = reactive({
      'Unique Id': [],
      Type: [],
      Make: [],
      Model: [],
      Year: [],
      Color: [],
      Condition: [],
      Case: [],
      Price: [],
      Description: [],
      Picture1: [],
    })
    const columns = [
      'Unique Id',
      'Type',
      'Make',
      'Model',
      'Year',
      'Color',
      'Condition',
      'Case',
      'Price',
      'Description',
      'Picture1',
      'Picture2',
    ];

    function changePage() {
      // Increment the value of page
      page.value++;
      // Reset page to 1 if it is greater than 3
      if (page.value > 3) {
        page.value = 1;
      }
    }

    function onDrop(acceptFiles, rejectReasons) {
      const file = acceptFiles[0];
      // console.log(file);
      const parseFile = async (file) => {

        // const file = input.value.files[0]
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = () => {
          const data = reader.result
          const parsedData = Papa.parse(data)
          csvData = parsedData.data
          console.log("csv datta table", csvData)
          headers.value = parsedData.data[0]
          rows.value = parsedData.data.slice(1, 5)
        }
      }
      parseFile(file);

      console.log("csvData agter file parse:", csvData);
    }

    const options = reactive({
      multiple: false,
      onDrop,
      accept: '.jpg',
    })
    const { getRootProps, getInputProps, ...rest } = useDropzone({ onDrop });


    function mapColumns() {
      page.value++;
      let arr = csvData
      // console.log("the csv array:", arr);
      let headersLen = arr[0].length
      for (let i = 0; i < headersLen; i++) {
        mappingObj[i] = [];
      }
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
          mappingObj[j].push(arr[i][j]);
        }
      }
      console.log("Mapped this: ", csvData[0]);
      return mappingObj
    }
    function addColumn() {
      selectedColumns.value.push(selectedColumn.value);
    }

    return {
      headers,
      rows,
      getRootProps,
      getInputProps,
      page,
      changePage,
      mapColumns,
      mappingObj,
      csvData,
      columnHeader,
      page2Headers,
      get remainingColumns() {
        return columns.filter((column) => !selectedColumns.value.includes(column));
      },
      ...rest,
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