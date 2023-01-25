<template>
  <slot :sample="firstSampleRow" :map="map" :fields="fields">
    <template v-if="firstSampleRow">
      <table v-bind="$attrs">
        <thead v-if="!noThead">
          <tr>
            <th>{{ labels.fieldColumn }}</th>
            <th>{{ labels.csvColumn }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(field, key) in fields" :key="key">
            <td>{{ field.label }}</td>
            <td>
              <select v-bind="selectAttributes" :name="`csv_uploader_map_${key}`" v-model="map[field.key]">
                <option v-if="!field.required" :value="null">&nbsp;</option>
                <option v-for="(column, key) in firstSampleRow" :key="key" :value="key">{{ column }}
                </option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </slot>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'CsvMap',
  props: {
    noThead: {
      type: Boolean,
      default: false,
    },
    selectAttributes: {
      type: Object,
      default() {
        return {};
      },
    },
    autoMatch: {
      type: Boolean,
      default: true,
    },
    autoMatchIgnoreCase: {
      type: Boolean,
      default: true,
    }

  },
  setup(props, context) {
    const firstSampleRow = ref(context.root.$data.VueCsvImportData.firstSampleRow);
    const map = ref(context.root.$data.VueCsvImportData.map);
    const fields = ref(context.root.$data.VueCsvImportData.fields);
    const labels = context.root.$data.VueCsvImportData.language;

    watch(
      () => context.root.$data.VueCsvImportData.map,
      () => {
        if (context.root.$data.VueCsvImportData.allFieldsAreMapped) {
          context.root.$data.buildMappedCsv();
        }
      },
      { deep: true }
    );

    if (props.autoMatch) {
      watch(
        () => context.root.$data.VueCsvImportData.csvSample,
        (newVal) => {
          if (newVal) {
            fields.value.forEach((field) => {
              newVal[0].forEach((columnName, index) => {
                const fieldName = props.autoMatchIgnoreCase ? field.label.toLowerCase().trim() : field.label.trim();
                const colName = props.autoMatchIgnoreCase ? columnName.toLowerCase().trim() : columnName.trim();
                if (fieldName === colName) {
                  map.value[field.key] = index;
                }
              });
            });
          }
        }
      );
    }

    return {
      firstSampleRow,
      map,
      fields,
      labels,
    };
  },
};
</script>
