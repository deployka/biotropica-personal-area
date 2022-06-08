import Consultations from '../pages/Consultations/Consultations';
import ErrorPage from '../pages/ErrorPage/containers/ErrorPage';
import AddGoal from '../pages/Goals/AddGoal';
import EditGoal from '../pages/Goals/EditGoal';
import Goals from '../pages/Goals/Goals';
import Policy from '../pages/Policy/containers/Policy';
import Edit from '../pages/Profile/containers/Edit';
import { ProfileLayout } from '../layouts/ProfileLayout';
import Questionnaire from '../pages/Questionnaire/Questionnaire';
import { ConsultationsList } from '../pages/Consultations/ConsultationsList';
import Tariffs from '../pages/Tariffs/Tariffs';
import { ConsultationPage } from '../pages/Consultation/Consultation';
import { Tasks } from '../pages/Tasks/Tasks';
import { Recommendations } from '../pages/Recommendations/Recommendations';
import SpecialistProfile from '../pages/SpecialistProfile/Profile';
import { AdminUsers } from '../pages/AdminUsers/AdminUsers';
import { PublicProfile } from '../components/PublicProfile/containers/PublicProfile';
import { SpecialistUsers } from '../pages/SpecialistUsers/SpecialistUsers';
import VideoConsultationsList from '../pages/SpecialistVideoConsultationsList/VideoConsultationsList';
import EditSpecialistProfile from '../pages/SpecialistProfile/Edit/Edit';
import { Logs } from '../pages/Logs/containers/Logs';
import PublicSpecialistProfile from '../pages/SpecialistProfile/PublicProfile';

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
    specialistComponent: VideoConsultationsList,
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
    component: ProfileLayout,
    specialistComponent: SpecialistProfile,
    exact: true,
  },
  {
    path: 'profile/edit/:active',
    component: Edit,
    specialistComponent: EditSpecialistProfile,
    exact: true,
  },
  {
    path: 'users/:id/tabs/:active',
    component: ProfileLayout,
    specialistComponent: PublicProfile,
    exact: true,
  },
  {
    path: 'users/:id',
    specialistComponent: PublicProfile,
    exact: true,
  },
  {
    path: 'users/:userId/tasks',
    specialistComponent: Tasks,
    exact: true,
  },
  {
    path: 'users/:userId/recommendations',
    specialistComponent: Recommendations,
    exact: true,
  },
  {
    path: 'logs',
    adminComponent: Logs,
    exact: true,
  },
  {
    path: 'profile/edit',
    component: Edit,
    exact: true,
  },
  {
    path: 'profile/tabs/:active',
    component: ProfileLayout,
    exact: true,
  },
  {
    path: 'specialists/:id',
    component: PublicSpecialistProfile,
  },

  {
    path: 'tariffs',
    component: Tariffs,
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
