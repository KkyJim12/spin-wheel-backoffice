import Grid from '@material-ui/core/Grid';

import ChartStat from 'components/Dashboard/ChartStat';
import NewUser from 'components/Dashboard/NewUser';
import LastestTransaction from 'components/Dashboard/LastestTransaction';

const DashboardPage = () => {
  const newMemberStat = [
    { splineValue: 2, argument: 5 },
    { splineValue: 5, argument: 10 },
    { splineValue: 3, argument: 15 },
    { splineValue: 10, argument: 20 },
  ];

  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={3}>
          <ChartStat
            title='สมาชิกเพิ่มที่ขึ้น 7 วัน'
            number={205}
            data={newMemberStat}
          />
        </Grid>
        <Grid item md={3}>
          <ChartStat
            title='จำนวนการแลกของรางวัล 7 วัน'
            number={205}
            data={newMemberStat}
          />
        </Grid>
        <Grid item md={3}>
          <ChartStat
            title='จำนวนการเติมโค๊ดทั้ง 7 วัน'
            number={205}
            data={newMemberStat}
          />
        </Grid>
        <Grid item md={3}>
          <ChartStat
            title='จำนวนการสุ่มทั้งหมดใน 7 วัน'
            number={205}
            data={newMemberStat}
          />
        </Grid>
        <Grid item md={8}>
          <LastestTransaction />
        </Grid>
        <Grid item md={4}>
          <NewUser />
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardPage;
