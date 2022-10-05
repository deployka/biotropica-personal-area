import Consultations from '../pages/Consultations/Consultations';
import ErrorPage from '../pages/ErrorPage/containers/ErrorPage';
import AddGoal from '../pages/Goals/AddGoal';
import EditGoal from '../pages/Goals/EditGoal';
import Goals from '../pages/Goals/Goals';
import Policy from '../pages/Policy/containers/Policy';
import Edit from '../pages/ClientProfile/Edit/Edit';
import Questionnaire from '../pages/Questionnaire/Questionnaire';
import { ConsultationsList } from '../pages/Consultations/ConsultationsList';
import Tariffs from '../pages/Tariffs/Tariffs';
import { ConsultationPage } from '../pages/Consultation/Consultation';
import { Tasks } from '../pages/Tasks/Tasks';
import { Recommendations } from '../pages/Recommendations/Recommendations';
import { AdminUsers } from '../pages/AdminUsers/AdminUsers';
import { SpecialistUsers } from '../pages/SpecialistUsers/SpecialistUsers';
import SpecialistConsultations from '../pages/SpecialistConsultations/SpecialistConsultations';
import EditSpecialistProfile from '../pages/SpecialistProfile/Edit/Edit';
import Logs from '../pages/Logs/Logs';
import PublicSpecialistProfile from '../pages/SpecialistProfile/PublicProfile';
import { PrivateProfileLayout } from '../layouts/Profile/Private';
import { PublicProfileLayout } from '../layouts/Profile/Public';
import PrivateSpecialistProfile from '../pages/SpecialistProfile/Profile';

const routes = [
  {
    path: '/',
    clientComponent: Tasks,
    specialistComponent: SpecialistUsers,
    adminComponent: AdminUsers,
    exact: true,
  },
  {
    path: 'recommendations',
    component: Recommendations,
    exact: true,
  },
  {
    path: 'consultations',
    clientComponent: Consultations,
    specialistComponent: SpecialistConsultations,
    exact: true,
  },
  {
    path: 'consultations/list',
    clientComponent: ConsultationsList,
    exact: true,
  },
  {
    path: 'consultations/list/:id',
    clientComponent: ConsultationPage,
    exact: true,
  },
  {
    path: 'profile',
    component: PrivateProfileLayout,
    specialistComponent: PrivateSpecialistProfile,
    adminComponent: Edit,
    exact: true,
  },
  {
    path: 'profile/edit',
    component: Edit,
    exact: true,
  },
  {
    path: 'profile/tabs/:active',
    component: PrivateProfileLayout,
    specialistComponent: PrivateSpecialistProfile,
    exact: true,
  },
  {
    path: 'profile/edit/:active',
    component: Edit,
    specialistComponent: EditSpecialistProfile,
    exact: true,
  },
  {
    path: 'users/:id',
    specialistComponent: PublicProfileLayout,
    adminComponent: PublicProfileLayout,
    exact: true,
  },
  {
    path: 'users/:id/tabs/:active',
    specialistComponent: PublicProfileLayout,
    adminComponent: PublicProfileLayout,
    exact: true,
  },
  {
    path: 'users/:userId/tasks',
    specialistComponent: Tasks,
    adminComponent: Tasks,
    exact: true,
  },
  {
    path: 'users/:userId/recommendations',
    specialistComponent: Recommendations,
    adminComponent: Recommendations,
    exact: true,
  },
  {
    path: 'logs',
    adminComponent: Logs,
    exact: true,
  },
  {
    path: 'specialists/:id',
    component: PublicSpecialistProfile,
  },
  {
    path: 'specialists/:id/tabs/:active',
    component: PublicSpecialistProfile,
  },
  {
    path: 'tariffs',
    clientComponent: Tariffs,
    adminComponent: Tariffs,
    exact: true,
  },
  {
    path: 'goals/add',
    clientComponent: AddGoal,
    exact: true,
  },
  {
    path: 'goals',
    clientComponent: Goals,
    exact: true,
  },
  {
    path: 'goals/:id',
    clientComponent: Goals,
    exact: true,
  },
  {
    path: 'goals/edit/:id',
    clientComponent: EditGoal,
    exact: true,
  },
  {
    path: 'policy',
    component: Policy,
    exact: true,
  },
  {
    path: 'questionnaire',
    clientComponent: Questionnaire,
    exact: true,
  },
  {
    path: '*',
    component: ErrorPage,
    exact: true,
  },
];

export default routes;
