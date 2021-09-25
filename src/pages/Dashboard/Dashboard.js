import Grid from '@material-ui/core/Grid';

import ChartStat from 'components/Dashboard/ChartStat';
import NewUser from 'components/Dashboard/NewUser';
import LastestTransaction from 'components/Dashboard/LastestTransaction';
import { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardPage = () => {
  // const newMemberStat = [
  //   { splineValue: 2, argument: 5 },
  //   { splineValue: 5, argument: 10 },
  //   { splineValue: 3, argument: 15 },
  //   { splineValue: 10, argument: 20 },
  // ];

  const [data, setData] = useState({});
  const [lastTenUser, setLastTenUser] = useState([]);
  const [lastTenRandom, setLastTenRandom] = useState([]);

  useEffect(() => {
    getDashboard();
  }, []);

  const getDashboard = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + '/api/v1/dashboards'
      );

      setData(response.data);

      let userLists = [];

      for (let i = 0; i < response.data.lastTenUser.length; i++) {
        userLists.push(response.data.lastTenUser[i]);
      }

      let randomLists = [];
      for (let i = 0; i < response.data.lastTenRandom.length; i++) {
        randomLists.push(response.data.lastTenRandom[i]);
      }

      setLastTenUser(userLists);
      setLastTenRandom(randomLists);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={3}>
          <ChartStat title='สมาชิกทั้งหมด' number={data.allUserCount} />
        </Grid>
        <Grid item md={3}>
          <ChartStat
            title='สมาชิกเพิ่มที่ขึ้น 7 วัน'
            number={data.newUserWeeklyCount}
          />
        </Grid>
        <Grid item md={3}>
          <ChartStat
            title='จำนวนการแลกของรางวัล 7 วัน'
            number={data.prizeExchangeWeeklyCount}
          />
        </Grid>

        <Grid item md={3}>
          <ChartStat
            title='จำนวนการสุ่มทั้งหมดใน 7 วัน'
            number={data.prizeRandomWeeklyCount}
          />
        </Grid>
        <Grid item md={8}>
          <LastestTransaction data={lastTenRandom} />
        </Grid>
        <Grid item md={4}>
          <NewUser data={lastTenUser} />
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardPage;
