import { Form } from "@heroui/form";
import { useState, type FormEvent } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { NumberInput } from "@heroui/number-input";
import { Switch } from "@heroui/switch";

import { title } from "~/app/components/primitives";
import DefaultLayout from "~/app/layouts/default";

export const roles = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "fullstack", label: "Fullstack" },
];

export const experienceLevels = [
  { key: "junior", label: "Junior" },
  { key: "mid", label: "Mid" },
  { key: "senior", label: "Senior" },
  { key: "lead", label: "Lead" },
];

export default function FormPage() {
  const [submitted, setSubmitted] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [isDryRun, setIsDryRun] = useState(true);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const raw = new FormData(e.currentTarget);
    const cvFile = raw.get("cv") as File | null;
    const name = (raw.get("name") as string) || "";
    const email = (raw.get("email") as string) || "";

    raw.append("isDryRun", `${isDryRun}`);

    if (!cvFile || cvFile.size === 0) {
      setError("Please attach your CV (PDF).");

      return;
    }
    if (!name || !email) {
      setError("Name and email are required.");

      return;
    }

    setError(null);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        body: raw,
      });

      if (!res.ok) {
        const text = await res.text();

        throw new Error(text || "Request failed");
      }
      const result = await res.json();

      setSubmitted(result);
    } catch (err) {
      console.error(err);

      setError(`Failed to submit form. Please try again`);
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
        <div className="inline-block max-w-2lg text-center justify-center">
          <h1 className={title()}>Candidate Application Form</h1>
        </div>

        <Switch isSelected={isDryRun} onValueChange={setIsDryRun}>
          Testing mode
        </Switch>
        <Form
          className="w-full"
          encType="multipart/form-data"
          onSubmit={onSubmit}
        >
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-4 gap-4">
            {/* Name */}
            <Input
              isRequired
              errorMessage="Please enter a valid name"
              label="Name"
              labelPlacement="outside"
              name="name"
              placeholder="Enter your name"
              type="text"
            />
            {/* Email */}
            <Input
              isRequired
              errorMessage="Please enter a valid email"
              label="Email"
              labelPlacement="outside"
              name="email"
              placeholder="Enter your email"
              type="email"
            />
          </div>

          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            {/* Role */}
            <Select
              isRequired
              errorMessage="Please select a valid role"
              label="Select an role"
              labelPlacement="outside"
              name="role"
              placeholder="Select your role"
            >
              {roles.map((role) => (
                <SelectItem key={role.key}>{role.label}</SelectItem>
              ))}
            </Select>
            {/* Experience Level */}
            <Select
              isRequired
              errorMessage="Please select a valid experience level"
              label="Select an experience level"
              labelPlacement="outside"
              name="experienceLevel"
              placeholder="Select your experience level"
            >
              {experienceLevels.map((experienceLevel) => (
                <SelectItem key={experienceLevel.key}>
                  {experienceLevel.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            {/* Experience Years */}
            <NumberInput
              isRequired
              defaultValue={0}
              errorMessage="Please enter a valid role"
              label="Experience Years"
              labelPlacement="outside"
              name="experienceYears"
              placeholder="Enter your experience years"
              type="number"
            />

            {/* Salary */}
            <NumberInput
              isRequired
              defaultValue={0}
              errorMessage="Please enter a valid alary"
              label="Salary"
              labelPlacement="outside"
              name="salary"
              placeholder="Enter your salary"
            />
          </div>

          {/* cv */}
          <Input
            isRequired
            accept="application/pdf"
            errorMessage="Please upload your CV as PDF"
            label="CV (PDF)"
            labelPlacement="outside"
            name="cv"
            placeholder="Select your CV"
            type="file"
          />
          {/* Message */}
          <Textarea
            isRequired
            errorMessage="Please enter a valid message"
            label="Message"
            labelPlacement="outside"
            name="message"
            placeholder="Enter your message"
            type="text"
          />
          {error && (
            <div className="text-small text-danger-500 text-left">{error}</div>
          )}

          <Button type="submit" variant="bordered">
            Submit
          </Button>
          {submitted && (
            <div className="text-small text-default-500">
              You submitted: <code>{JSON.stringify(submitted)}</code>
            </div>
          )}
        </Form>
      </section>
    </DefaultLayout>
  );
}
