import { SetupPage } from "@/components/custom-ui/setup-page";

export default function About() {
  return (
    <div className="min-h-screen pt-16">
      <SetupPage title="About the Project" themeColor="teal">
        <div className="prose prose-invert max-w-none">
          <h3 className="text-2xl font-semibold text-white mb-4 mt-2">About Dataset</h3>
          <p className="text-neutral-400 mb-6 leading-relaxed">
            This dataset contains high-resolution images of infected and healthy plant leaves, categorized into 23 distinct classes.
            The primary goal is to enable machine learning models to accurately detect and classify plant diseases across five major crops: apple, corn, pepper, potato, and tomato.
          </p>
          
          <h3 className="text-2xl font-semibold text-white mb-4 mt-8">Content</h3>
          <ul className="list-disc pl-6 text-neutral-400 mb-6 space-y-2">
            <li>Dataset (35,725 images, 23 classes)</li>
            <li>High-quality, standardized leaf images</li>
            <li>Balanced representation across disease categories</li>
          </ul>

          <h3 className="text-2xl font-semibold text-white mb-4 mt-8">Our Goal</h3>
          <p className="text-neutral-400 leading-relaxed">
            By leveraging this comprehensive dataset, we aim to provide an accessible, accurate tool for farmers, gardeners, and agricultural professionals to quickly identify plant health issues and take appropriate action before significant crop loss occurs.
          </p>
        </div>
      </SetupPage>
    </div>
  );
}
