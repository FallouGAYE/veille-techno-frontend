import LoginForm from '../components/LoginForm';
import officeImage from '../../assets/images/taskboard-office.png';
import '../auth.css';

function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-visual">
        <img
          src={officeImage}
          alt="TaskBoard workspace"
          className="office-image"
        />
      </section>

      <section className="login-form-section">
        <LoginForm />
      </section>
    </main>
  );
}

export default LoginPage;