import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CollectionDetails from "../CollectionDetails";

const CollectionPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [collectionData, setCollectionData] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);

      const fetchCollectionDetails = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/collections/${id}`
          );

          if (!response.ok) {
            throw new Error(
              `Network response was not ok: ${response.statusText}`
            );
          }
          const data = await response.json();

          console.log("API Response:", data);

          setCollectionData(data);
        } catch (error) {
          console.error("Error fetching collection data:", error);

          const mockCollection = {
            short_code: id,
            name: "Default Collection Name",
            url: "",
            owner: "ocladmin",
            owner_type: "User",
            collection_type: "Subset",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            id: id,
            version: "HEAD",
            canonical_url: null,
            autoexpand_head: true,
            type: "Collection",
            checksums: {
              standard: "mock_standard_checksum",
              smart: "mock_smart_checksum",
            },
          };

          setCollectionData(mockCollection);
        } finally {
          setLoading(false);
        }
      };

      fetchCollectionDetails();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return collectionData ? (
    <CollectionDetails collection={collectionData} />
  ) : (
    <p>Collection not found</p>
  );
};

export default CollectionPage;
