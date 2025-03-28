"use server";

import { Address } from "@/interfaces";
import { prisma } from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {

    //Crea o remplaza la direccion
    const newAddress = await createOrReplaceAddress( address, userId );

    return {
      ok: true,
      address: newAddress,
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo guardar la dirección",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {

    console.log({userId});

    //Se valida si exista la ubicacion en el user
    const storedAddress = await prisma.userAddress.findUnique({
      where: {userId},
    });

    const addressToSave = {
      userId: userId,
      address: address.address,
      address2: address.address2,
      countryId: address.country,
      city: address.city,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      zipCode: address.zipCode,
    };

    //Si no existe se guarda
    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      });

      return newAddress;
    }

    //Si existe se actualiza
    const updatedAddress = await prisma.userAddress.update({
      where: {userId},
      data: addressToSave
    })

    return updatedAddress;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo guardar la dirección");
  }
};
