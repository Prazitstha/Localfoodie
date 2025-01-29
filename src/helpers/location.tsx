import Geolocation, {
  GeolocationResponse,
  GeolocationError,
} from '@react-native-community/geolocation';

/**
 * Gets current location of the user
 *
 * @returns {Promise<GeolocationResponse | GeolocationError>} position or error
 */
export function getCurrentLocation(
  throwError = true,
): Promise<GeolocationResponse | GeolocationError | undefined> {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      response => resolve(response),
      error => {
        if (throwError) {
          console.log('Error!!!Returnedd!!', error);
          reject(error);
        } else {
          resolve(undefined);
        }
      },
      {
        timeout: 60000,
      },
    );
  });
}
