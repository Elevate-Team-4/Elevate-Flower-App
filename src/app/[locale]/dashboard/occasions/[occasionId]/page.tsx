import EditOccasion from "../_components/edit-occasion";

interface ProductIdProbs {
  params: {
    occasionId: string;
  };
}

export default async function Page({ params }: ProductIdProbs) {
  return <EditOccasion occasionId={params.occasionId} />;
}
