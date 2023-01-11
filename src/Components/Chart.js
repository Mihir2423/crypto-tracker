import axios from "axios"
import React, { useEffect, useState } from "react"
import { Line  } from "react-chartjs-2"
import { HistoricalChart } from "../config/api"
import { CryptoState } from "../context"
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

export default function Chart({ coin, id }) {
    const [historicData, setHistoricData] = useState()
    const [days, setDays] = useState(1)
    const { currency } = CryptoState()

    const fetchInfo = async () => {
        const { data } = await axios.get(HistoricalChart(id, days, currency))
        setHistoricData(data.prices)
    }
    useEffect(() => {
        fetchInfo()
        setDays(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, days])
    console.log(historicData)
    return (
        <div className="single_container_right">
         <Line
              data={{
                labels: historicData?.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData?.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#00FFCB",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
        </div>
    )
}
