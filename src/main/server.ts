import { environment } from '@/main/config';

try {
  (async () => {
    const app = (await import('./config/app')).default;
    app.listen(environment.PORT, () => {
      console.log(
        `Microservice of NFS-e running at port ${environment.PORT} in environment ${environment.ENVIRONMENT} 😎`,
      );
    });
  })();
} catch (error) {
  console.log(error);
}
