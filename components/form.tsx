import React, { useState } from "react";
import {
  Container,
  Text,
  Input,
  Spacer,
  Button,
  Grid,
  Dropdown,
  Loading,
} from "@nextui-org/react";

import { Configuration, OpenAIApi } from "openai";
import ConfettiExplosion from "confetti-explosion-react";

const Form: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chargeRange, setChargeRange] = useState<string | null>(null);

  const [platform, setPlatform] = useState<string>("YouTube");
  const [subscribers, setSubscribers] = useState<string>();
  const [views, setViews] = useState<string>();
  const [brandDealType, setBrandDealType] = useState<string>("Brand Deal");
  const [niche, setNiche] = useState<string>("Select a YouTube Niche");

  const [isExploding, setIsExploding] = useState<Boolean>(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    // Create the prompt for ChatGPT
    const prompt = `How much should a content creator charge for a ${brandDealType} in the ${niche} niche with ${subscribers} subscribers and an average of ${views} monthly views?`;

    // Make the API call to ChatGPT
    const configuration = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are part of my site Rate My Rates. This site helps content creators find how much they should be charging for brand deals. You will only respond with a dollar range when I provide you information. Example: $100-200. Do not give any other response. Make your best judgement based on the information provided.",
        },
        { role: "user", content: prompt },
      ],
    });
    console.log(completion.data.choices[0].message?.content);

    const data = completion.data.choices[0].message?.content;

    // Process the response
    setChargeRange(JSON.stringify(data).replace(/"/g, ""));
    // Extract the charge range from the response data
    setIsLoading(false);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Grid.Container alignItems="center" direction="column">
        <Grid xs={2}>
          <Text h4>Platform</Text>
        </Grid>
        <Grid xs={2}>
          <Input
            size="md"
            placeholder="Platform"
            disabled
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          />
        </Grid>

        <Grid xs={2}>
          <Text h4>Number of Subscribers</Text>
        </Grid>
        <Grid xs={2}>
          <Input
            size="md"
            placeholder="Subscribers"
            value={subscribers}
            onChange={(e) => setSubscribers(e.target.value)}
          />
        </Grid>

        <Grid xs={2}>
          <Text h4>Average Monthly Views</Text>
        </Grid>
        <Grid xs={2}>
          <Input
            size="md"
            placeholder="Average Monthly Views"
            value={views}
            onChange={(e) => setViews(e.target.value)}
          />
        </Grid>

        <Grid xs={2}>
          <Text h4>Brand Deal Type</Text>
        </Grid>
        <Grid xs={2}>
          <Input
            size="md"
            placeholder="Brand Deal Type"
            disabled
            value={brandDealType}
            onChange={(e) => setBrandDealType(e.target.value)}
          />
        </Grid>

        <Grid xs={2}>
          <Text h4>Niche</Text>
        </Grid>
        <Grid xs={2}>
          <Dropdown>
            <Dropdown.Button flat placeholder="Select a YouTube Niche">
              {niche}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Static Actions"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={[niche]} // Update to an array
              onSelectionChange={(keys) => {
                const selectedValue = keys as string;
                setNiche(selectedValue);
              }}
            >
              <Dropdown.Item key="Gaming">Gaming</Dropdown.Item>
              <Dropdown.Item key="Finance">Finance</Dropdown.Item>
              <Dropdown.Item key="Music">Music</Dropdown.Item>
              <Dropdown.Item key="Travel">Travel</Dropdown.Item>
              <Dropdown.Item key="Fitness">Fitness</Dropdown.Item>
              <Dropdown.Item key="Vlog">Vlog</Dropdown.Item>
              <Dropdown.Item key="Tech">Tech</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Grid>
      </Grid.Container>

      <div
        style={{
          marginTop: "2rem",
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
          Submit
        </Button>
      </div>
      {/* Show the charge range if available */}
      {chargeRange ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <Text
            h1
            style={{
              position: "relative",
              zIndex: 1,
            }}
          >
            {`Charge Range: ${chargeRange}`}
          </Text>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 0,
            }}
          >
            <ConfettiExplosion />
          </div>
        </div>
      ) : (
        // Show loading spinner while waiting for the response
        isLoading && <Loading />
      )}
    </div>
  );
};

export default Form;
