import { chartColors } from './colors'

const updateData = ({ newData = {}, labels = [], ...rest }) => ({
  ...rest,
  labels: [...labels, newData.label],
  currentSet: [].concat(rest.currentSet, newData.value)
})

const createPieChart = (arr = []) =>
  arr.reduceRight(
    (acc, val) => {
      let newData = {
        value: Number(val.balance) / Math.pow(10, val.contract_decimals),
        label: val.address
      }
      acc = {
        ...acc,
        ...updateData({
          newData,
          labels: acc.labels,
          currentSet:
            acc.currentSet.length === 0
              ? [newData.value]
              : acc.currentSet.concat(newData.value),
          datasets: [
            {
              data: [...acc.currentSet],
              backgroundColor: chartColors
            }
          ]
        })
      }
      return acc
    },
    {
      responsive: true,
      labels: [],
      currentSet: [],
      datasets: [
        {
          data: []
        }
      ]
    }
  )

export { createPieChart }
