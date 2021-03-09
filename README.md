Backend:

- Use FastAPI
- Dockerize and push to GCP Container Registry by command: gcloud run deploy --image gcr.io/interview-assignment-306921/aiven-assignment (running from backend dir)
- Deploy image using GUI, the backend available at this link: https://aiven-backend-knbivuzamq-lz.a.run.app/api/clouds

Frontend:

- Use React with TypeScript
- Use Material-UI: https://material-ui.com/
- UI:
  -- Hide/Show drawer which containe navigation link through top left icon in app bar.
  -- Support table pagination
- Functions:
  -- Filter data by region, provider from textfield
  -- Sort by shortest distance (checkbox)
  -- Sort by clicking on property name in table header
  -- Alert information that user selected
  Hosting and deploy:
- Use firebase, it is available at this link: https://interview-assignment-306921.web.app/

CI/CD: Github action for frontend

Unitest: Basic test for backend
