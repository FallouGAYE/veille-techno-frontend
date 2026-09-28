import RegisterForm from '../components/RegisterForm';
import registerImage from '../../assets/images/register-bg.png';
import '../register.css';

function RegisterPage() {
  return (
    <main className="register-page">
      <section className="register-visual">
        <img
          src={registerImage}
          alt="TaskBoard workspace"
          className="register-office-image"
        />
      </section>

      <section className="register-form-section">
        <RegisterForm />
      </section>
    </main>
  );
}

export default RegisterPage;