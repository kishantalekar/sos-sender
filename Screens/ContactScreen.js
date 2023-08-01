import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { getContacts, setMyContacts } from "../storage/storage";
import { AddContact, ContactInfo } from "../components";

const ContactScreen = ({ homeScreenSetContact }) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [active, setActive] = useState(false);
  const [contacts, setContacts] = useState([]);

  const handleAddContact = async () => {
    try {
      if (!name || !mobile) {
        alert("Name and Mobile fields are required");
        return;
      }
      const contactExits = contacts.some(
        (contact) => contact?.mobile === mobile
      );
      if (contactExits) {
        alert("Contact with the same mobile number already exists");
        return;
      }
      const newContact = { mobile, name };
      let updatedContacts = [];
      if (contacts && contacts.length > 0) {
        updatedContacts = [...contacts, newContact];
      } else {
        updatedContacts = [newContact];
      }

      await setMyContacts(updatedContacts);
      await getAllContacts();

      setActive(false);
      setMobile("");
      setName("");
    } catch (error) {
      console.log(error, "failed to add a contact");
    }
  };

  const getAllContacts = async () => {
    try {
      const data = await getContacts();
      if (data && data?.length > 0) {
        setContacts(data);
        homeScreenSetContact(data);
      }
    } catch (error) {
      console.log(error, "from homescrreen error");
    }
  };

  const removeContact = async (mobile) => {
    try {
      let newContactList = contacts;
      newContactList = newContactList.filter(
        (number) => number.mobile !== mobile
      );
      setContacts(newContactList);
      await setMyContacts(newContactList);
      await getAllContacts();
    } catch (error) {
      console.log(error, "from removing contact");
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>SOS Contacts</Text>
      </View>
      <AddContact
        active={active}
        setActive={setActive}
        handleAddContact={handleAddContact}
        setMobile={setMobile}
        setName={setName}
        name={name}
        mobile={mobile}
        canAdd={contacts.length < 5}
      />
      <View style={{ marginTop: 10, flex: 1 }}>
        <Text
          style={{
            fontWeight: 300,
            fontSize: 14,
            textAlign: "center",
            color: "gray",
          }}
        >
          You can select upto 5 SOS contacts.
        </Text>
        <Text
          style={{
            fontWeight: 300,
            fontSize: 14,
            textAlign: "center",
            color: "gray",
          }}
        >
          Tap on any contact to send them a sos message.
        </Text>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100, marginTop: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            {contacts?.length > 0 ? (
              contacts?.map((data, i) => (
                <ContactInfo
                  name={data.name}
                  mobile={data.mobile}
                  key={i}
                  setContacts={setContacts}
                  homeScreenSetContact={homeScreenSetContact}
                  removeContact={removeContact}
                />
              ))
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  marginTop: 200,
                }}
              >
                <Text>You have not added any contacts</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 40,
    flex: 1,
    backgroundColor: "#edf5f7",
  },
  headingContainer: {
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 500,
    fontFamily: "sans-serif",
    textAlign: "center",
  },
  contactContainer: {
    marginTop: 200,
  },
  addBtn: {
    flexDirection: "row",
    backgroundColor: "#b31b1a",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 10,
  },
  addText: {
    fontSize: 20,
    fontWeight: "400",
    paddingLeft: 20,
    color: "white",
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  contactInfo: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
    // justifyContent: "space-between",
  },
  removeBtn: {
    color: "#b31b1a",
    fontSize: 20,
    fontWeight: "500",
  },
});

export default ContactScreen;
